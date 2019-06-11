import React from "react";
import { connect } from 'react-redux';
import { incScore, incRoundNum, setRounds, setMessage, setPageType } from '../actions/actions';
import ChoiceList from './ChoiceList';
import { Howl } from 'howler';
import { PAGE_TYPES } from '../constants';

const NUM_ROUNDS = 7;

class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            preview: undefined
        })

        this.playPreview = this.playPreview.bind(this);
        this.getRounds = this.getRounds.bind(this);
        this.getRandomSongs = this.getRandomSongs.bind(this);
        this.createRound = this.createRound.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
    }

    async componentDidMount() {
        await this.props.setRounds(this.getRounds());
        const rounds = this.props.rounds;
        const roundNum = this.props.roundNum; 
        const correctId = rounds[roundNum].correctId;

        const previewUrl = this.props.tracks.get(correctId).previewUrl;
        this.setState({
            preview: new Howl({ 
                src: previewUrl, 
                format: 'mp3',
            }),
        }, this.playPreview);
    }

    handleChoice(songId) {
        this.state.preview.fade(1, 0, 2000);

        const rounds = this.props.rounds;
        const roundNum = this.props.roundNum;
        if (songId === rounds[roundNum].correctId) {
            this.props.setMessage("Correct!");
            this.props.incScore();
        } else {
            this.props.setMessage("Incorrect!")
        }
        
        setTimeout(() => {
            this.state.preview.stop();
            if (this.props.roundNum < 6) {  // total rounds is 7, only inc num rounds if game isn't over
                this.props.incRoundNum();
                this.props.setPageType(PAGE_TYPES.TRANSITION)
                this.props.setMessage("");
            } else {
                this.props.setPageType(PAGE_TYPES.GAME_OVER);
            }
        }, 3000)
    }

    playPreview() {
        let preview = this.state.preview;
        preview.play(); 
    
        // Crossfade music at beginning and end
        preview.fade(0, 1, 3000);
        setTimeout(() => {
            console.log('fading');
            preview.fade(1, 0, 3000);
        }, 27000);
    }   

    getRounds() {
        let keys = Array.from(this.props.artistInfo.tracks.keys());
        let rounds = [];
        for (let i = 0; i < NUM_ROUNDS; i++) {
            let songs = this.getRandomSongs(keys);
            rounds.push(this.createRound(songs));
        }
        return rounds;
    }

    getRandomSongs(choices) {
        let songs = [];
        for (let i = 0; i < 4; i++) {
            const index = Math.floor((Math.random() * choices.length));
            songs.push(choices[index]);
            choices.splice(index, 1);
        }
        return songs;
    }

    createRound(choices) {
        // Pick random song to be correct
        const index = Math.floor((Math.random() * 4));
        const correctId = choices[index]
        return {
            correctId,
            choices
        };
    }

    render() {
        return (
            <div>
                <h1>30s</h1>
                <h3>{this.props.artistInfo.name}</h3>
                <img src={this.props.artistInfo.largeImageUrl} alt={this.props.artistInfo.name}/>
                <div>
                    {this.props.rounds 
                    ? <ChoiceList handleChoice={this.handleChoice} />
                    : <div className="spinner" />}
                </div>
                <h3>{ this.props.message }</h3>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tracks: state.reducers.artistInfo.tracks,
    artistInfo: state.reducers.artistInfo,
    rounds: state.reducers.rounds,
    roundNum: state.reducers.roundNum,
    score: state.reducers.score,
    message: state.reducers.message,
    songSelected: state.reducers.songSelected
})

export default connect(mapStateToProps, { incScore, incRoundNum, setRounds, setMessage, setPageType,  })(GamePage);