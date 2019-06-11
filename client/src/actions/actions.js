import './types';
import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_ARTIST_INFO, SET_PAGE_TYPE, SET_ROUNDS, INC_ROUND_NUM, INC_SCORE, SET_MESSAGE, RESET_GAME, PLAY_AGAIN, SET_SEARCH_RESULTS, IS_SONG_SELECTED } from './types';

export const isSongSelected = (bool) => dispatch => {
    dispatch ({
        type: IS_SONG_SELECTED, 
        bool
    })
};

export const setAccessToken = (accessToken) => dispatch => {
    dispatch({
        type: SET_ACCESS_TOKEN,
        accessToken
    })
};

export const setRefreshToken = (refreshToken) => dispatch => {
    dispatch({
        type: SET_REFRESH_TOKEN,
        refreshToken
    })
};

export const setSearchResults = (searchResults) => dispatch => {
    dispatch({
        type: SET_SEARCH_RESULTS,
        searchResults
    })
}

export const setArtistInfo = (artistInfo) => dispatch => {
    dispatch({
        type: SET_ARTIST_INFO,
        artistInfo
    })
};

export const setPageType = (page) => dispatch => {
    dispatch({
        type: SET_PAGE_TYPE,
        page
    })
};

export const setRounds = (rounds) => dispatch => {
    dispatch({
        type: SET_ROUNDS,
        rounds
    })
}

export const incRoundNum = () => dispatch => {
    dispatch({
        type: INC_ROUND_NUM
    })
}

export const incScore = () => dispatch => {
    dispatch({
        type: INC_SCORE
    })
}

export const setMessage = (message) => dispatch => {
    dispatch({
        type: SET_MESSAGE,
        message
    })
}

export const resetGame = () => dispatch => {
    dispatch({
        type: RESET_GAME
    })
}

export const playAgain = () => dispatch => {
    dispatch({
        type: PLAY_AGAIN
    })
}