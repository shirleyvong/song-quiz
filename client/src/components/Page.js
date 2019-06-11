import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PAGE_TYPES } from '../constants';
import HomePage from './HomePage';
import GamePage from './GamePage';
import GameOverPage from './GameOverPage';
import Transition from './Transition';
import { setPageType } from '../actions/actions';

class Page extends Component {
    render() {
        let component; 
        switch(this.props.pageType) {
            case PAGE_TYPES.HOME:
                component = <HomePage />
                break;
            case PAGE_TYPES.GAME:
                component = <GamePage />
                break;
            case PAGE_TYPES.GAME_OVER:
                component = <GameOverPage />
                break;
            case PAGE_TYPES.TRANSITION:
                component = <Transition />
                break;
            default:
                console.log("wtf");
        }

        return (
            <div>
                <div>
                    <button onClick={() => this.props.setPageType(PAGE_TYPES.HOME)}>Home Page</button>
                    <button onClick={() => this.props.setPageType(PAGE_TYPES.GAME)}>Game Page</button>
                    <button onClick={() => this.props.setPageType(PAGE_TYPES.GAME_OVER)}>Game Over Page</button>
                    <button onClick={() => this.props.setPageType(PAGE_TYPES.TRANSITION)}>Transition Page</button>
                </div>
                { component }                    
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pageType: state.reducers.pageType
});

export default connect(mapStateToProps, { setPageType })(Page);

