import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PAGE_TYPES } from '../constants';
import { setArtistInfo, setPageType } from '../actions/actions';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.onArtistSelect = this.onArtistSelect.bind(this);
    }

    onArtistSelect(artistId) {
        console.log("Selected artist id ", artistId);
        let artist = this.props.searchResults.get(artistId);   
        console.log(artist);
        this.props.setArtistInfo({
            id: artistId,
            name: artist.name,
            smallImageUrl: artist.smallImageUrl,
            largeImageUrl: artist.largeImageUrl,
            tracks: artist.tracks
        })
        this.props.setPageType(PAGE_TYPES.TRANSITION)
    }

    render() {
        let artists = [];
        if (this.props.searchResults) {
            for (const [key, val] of this.props.searchResults.entries()) {
                artists.push(
                    <li key={key} className="artist" onClick={() => this.onArtistSelect(key)}>
                        <img className="artist-img" src={val.smallImageUrl} alt="artist"/>
                        <h3>{val.name}</h3>
                    </li>
                )
            }
        }
        return (
            <ul className="results">{artists}</ul>
        )
    }
}

const mapStateToProps = state => ({
    searchResults: state.reducers.searchResults
})

export default connect(mapStateToProps, { setArtistInfo, setPageType })(SearchResults);