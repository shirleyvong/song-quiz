import React, { Component } from 'react';
import queryString from 'querystring';
import { connect } from 'react-redux';
import { setSearchResults, setPageType } from '../actions/actions'
import PropTypes from 'prop-types';
import SearchResults from './SearchResults';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            input: "",
            errorMsg: "",
            loading: false,
        })

        this.handleSearch = this.handleSearch.bind(this);
        this.updateInput = this.updateInput.bind(this);

        this.getArtistAlbums = this.getArtistAlbums.bind(this);
        this.getTracksFromAlbum = this.getTracksFromAlbum.bind(this);
        this.getArtistTracks = this.getArtistTracks.bind(this);
        this.getArtistsFromResults = this.getArtistsFromResults.bind(this);
    }

    // Returns ids of singles and albums from the artist in a list
    async getArtistAlbums(id) {
        const response = await fetch("https://api.spotify.com/v1/artists/" + id + "/albums?" + queryString.stringify({
            limit: 50,
            include_groups: "single,album"
        }), { headers: { "Authorization": "Bearer " + this.props.accessToken }});

        if (response.status !== 200) {
            return;
        }

        const results = await response.json();
        let albums = [];
        results.items.forEach(album => {
            albums.push(album.id);
        })

        return albums;
    }

    // Returns tracks from a specific album in a map, where key=track id, value=track info
    async getTracksFromAlbum(id) {
        const response = await fetch("https://api.spotify.com/v1/albums/" + id + "/tracks?" + 
            queryString.stringify({ limit: 50 }), 
            { headers: { "Authorization": "Bearer " + this.props.accessToken }
        })

        if (response.status !== 200) {
            return;
        } else if (response.status === 429) {
            console.log(response);  
        }

        const results = await response.json();
        let albumTracks = new Map();
        results.items.forEach(track => {
            albumTracks.set(track.id, {
                name: track.name,
                previewUrl: track.preview_url
            });
        });

        return albumTracks;
    }

    // Returns a map of an artists tracks, key=track id, value=track info
    async getArtistTracks(id) {
        return new Promise((resolve, reject) => { 
            this.getArtistAlbums(id)
            .then(albums => {
                let promises = []
                albums.forEach(album => {
                    promises.push(this.getTracksFromAlbum(album));
                });
                return Promise.all(promises);
            })
            .then(tracks => {
                // Combine all key-value pairs in tracks to a single map
                let fullTrackList = new Map();
                tracks.forEach(item => {
                    for (const [key, val] of item.entries()) {
                        fullTrackList.set(key, val);
                    }
                })                 
                resolve(fullTrackList);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    // Returns a list of artist and their info from the search as JSON
    async getSearchResults() {
        const qs = queryString.stringify({
            q: this.state.input,
            type: "artist",
            limit: 5
        });

        const response = await fetch("https://api.spotify.com/v1/search?" + qs, 
            { headers: { "Authorization": "Bearer " + this.props.accessToken }});
        if (response.status !== 200) {
            // error
            return;
        }
        const results = await response.json();
        return results.artists.items;
    }

    // Returns structured artist data used for the game
    async getArtistsFromResults(results) {
        const artists = await Promise.all(
            results
            .filter(res => res.images.length > 0)
            .map(async (res) => {
                const tracks = await this.getArtistTracks(res.id);
                return {
                    id: res.id,
                    name: res.name,
                    smallImageUrl: res.images[2].url,
                    largeImageUrl: res.images[1].url,
                    tracks: tracks              
                }    
            }
        )).catch(err => {
            console.log(err);
        });

        let merged = new Map();
        artists.forEach(artist => {
            merged.set(artist.id, {
                name: artist.name,
                smallImageUrl: artist.smallImageUrl,
                largeImageUrl: artist.largeImageUrl,
                tracks: artist.tracks    
            })
        })
        return merged;
    }

    async handleSearch(event) {
        event.preventDefault();

        if (this.state.input.length === 0) {
            this.setState({ errorMsg: "Artist input is required" });
            return;
        } else {
            this.setState({ errorMsg: "" })
        }
    
        this.setState({ loading: true })

        const results = await this.getSearchResults();
        const artists = await this.getArtistsFromResults(results)
        console.log(artists);
        this.props.setSearchResults(artists);
        this.setState({ loading: false })
    }

    updateInput(event) {
        this.setState({input: event.target.value});
    }

    render() {        
        return (
            <div>
                <form className="search-form">
                    <input className="form-input" type="text" placeholder="Enter an artist..." onChange={this.updateInput} value={this.state.value} /><br />
                    <button className="search-btn btn"  onClick={this.handleSearch}>Search</button>
                </form>

                <p>{this.state.errorMsg}</p>

                {this.state.loading && <div className="spinner" />} 
                {this.props.searchResults && <SearchResults />}
            </div>
        )
    }
}

Search.propTypes = {
    accessToken: PropTypes.string,
    setSearchResults: PropTypes.func.isRequired,
    setPageType: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    accessToken: state.reducers.accessToken,
    searchResults: state.reducers.searchResults
})

export default connect(mapStateToProps, { setSearchResults, setPageType })(Search);