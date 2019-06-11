import React, { Component } from "react";
import { connect } from 'react-redux';
import Choice from './Choice';

class ChoiceList extends Component {
    render() {
        let roundNum = this.props.roundNum;
        let rounds = this.props.rounds;
        let choices;
        if (this.props.rounds && this.props.roundNum < 7) {
            choices = rounds[roundNum].choices.map(choice => {
                return <Choice key={choice} id={choice} handleChoice={this.props.handleChoice} />
            });
        } 

        return (
            <div>
                <ul className="song-choices">{choices}</ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    rounds: state.reducers.rounds,
    roundNum: state.reducers.roundNum,
    score: state.reducers.score,
    tracks: state.reducers.artistInfo.tracks
})

export default connect(mapStateToProps)(ChoiceList);