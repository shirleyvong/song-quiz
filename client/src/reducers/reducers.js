import '../actions/types';
import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_ARTIST_INFO, SET_PAGE_TYPE, SET_ROUNDS, INC_ROUND_NUM, INC_SCORE, SET_MESSAGE, RESET_GAME, PLAY_AGAIN, SET_SEARCH_RESULTS, IS_SONG_SELECTED } from '../actions/types';
import { PAGE_TYPES } from '../constants';

const initialState = {
    authToken: undefined,
    refreshToken: undefined,
    artistInfo: undefined,
    pageType: PAGE_TYPES.HOME,
    rounds: undefined,
    roundNum: 0,
    score: 0,
    message: "",
    searchResults: undefined, 
    songSelected: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case IS_SONG_SELECTED:
            return {
                ...state,
                songSelected: action.bool
            }
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.accessToken
            }
        case SET_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.refreshToken
            }
        case SET_ARTIST_INFO:
            return {
                ...state,
                artistInfo: action.artistInfo
            }
        case SET_PAGE_TYPE:
            return {
                ...state,
                pageType: action.page
            }
        case SET_ROUNDS:
            return {
                ...state,
                rounds: action.rounds
            }
        case INC_ROUND_NUM:
            return {
                ...state,
                roundNum: ++state.roundNum
            }
        case INC_SCORE:
            return {
                ...state,
                score: ++state.score
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case RESET_GAME:
            return {
                ...state,
                artistInfo: undefined,
                rounds: undefined,
                roundNum: 0,
                score: 0,
                message: "",
                searchResults: undefined,
                pageType: PAGE_TYPES.HOME
            }
        case PLAY_AGAIN:
            return {
                ...state,
                rounds: undefined,
                roundNum: 0,
                score: 0,
                message: "",
                pageType: PAGE_TYPES.TRANSITION
            }
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.searchResults
            }
        default:
            return state;
    }
}