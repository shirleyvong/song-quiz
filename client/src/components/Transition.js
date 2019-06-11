import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setPageType, resetGame } from '../actions/actions';
import { PAGE_TYPES } from '../constants';

class Transition extends Component {
    render() {
        const roundNum = this.props.roundNum + 1;
        return (
            <div className="transition">
                <h1>Round {roundNum}</h1>
                <h3>Score: {this.props.score}</h3>
                <h3>{this.props.artistInfo.name}</h3> 

                <button className="btn" onClick={() => this.props.setPageType(PAGE_TYPES.GAME)}>Continue</button>
                <button className="btn" onClick={() => this.props.resetGame()}>Quit</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    roundNum: state.reducers.roundNum,
    score: state.reducers.score,
    artistInfo: state.reducers.artistInfo
})

export default connect(mapStateToProps, { setPageType, resetGame })(Transition);
