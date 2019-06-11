import React, { Component } from "react";
import { connect } from 'react-redux';

class Choice extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.handleChoice(this.props.id);
    }

    render() {
        let songName;
        if (this.props.tracks) {
            songName = this.props.tracks.get(this.props.id).name;
        }
        return (
            <li key={this.props.id} className="choice" onClick={this.handleClick}>
                {songName}
            </li>
        )
    }
}

const mapStateToProps = state => ({
    rounds: state.reducers.rounds,
    tracks: state.reducers.artistInfo.tracks,
    roundNum: state.reducers.roundNum
});

export default connect(mapStateToProps)(Choice);