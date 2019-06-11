import React, { Component } from "react";
import { connect } from 'react-redux'
import { playAgain, resetGame, setPageType } from '../actions/actions';

class GameOverPage extends  Component {
    constructor(props) {
        super(props);

        this.handleNewGame = this.handleNewGame.bind(this);
        this.handlePlayAgain = this.handlePlayAgain.bind(this);
    }

    handleNewGame() {
        this.props.resetGame();
    }

    handlePlayAgain() {
        this.props.playAgain();
    }

    render() {
        let roundNum = this.props.roundNum + 1;
        return (
            <div>
                <h3>You got {this.props.score} of {roundNum} songs correct.</h3>
                <p>Not quite a true fan yet ...</p>
                
                <button className="btn" onClick={this.handlePlayAgain}>Play Again</button>
                <button className="btn" onClick={this.handleNewGame}>New Artist</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    score: state.reducers.score,
    roundNum: state.reducers.roundNum
})

export default connect (mapStateToProps, { playAgain, resetGame, setPageType })(GameOverPage);