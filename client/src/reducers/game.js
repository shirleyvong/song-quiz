import shuffle from 'knuth-shuffle-seeded';
import api from '../services/api';

const SET_TRACKS = 'SET_TRACKS';
const INCREMENT_ROUND = 'INCREMENT_ROUND';
const SET_QUESTIONS = 'SET_QUESTIONS';
const INCREMENT_CORRECT = 'INCREMENT_CORRECT';
const SET_GAME_STATE = 'SET_GAME_STATE';
const RESET_GAME = 'RESET_GAME';
const FETCH_TRACKS_PENDING = 'FETCH_TRACKS_PENDING';
const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

const GAME_STATE = {
  LOADING: 'LOADING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE',
};

const initialState = {
  tracks: [],
  questions: [],
  roundNum: 0,
  numCorrect: 0,
  gameState: GAME_STATE.LOADING,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACKS:
      return { ...state, tracks: action.tracks };
    case INCREMENT_ROUND:
      return { ...state, roundNum: state.roundNum + 1 };
    case SET_QUESTIONS:
      return { ...state, questions: action.questions };
    case INCREMENT_CORRECT:
      return { ...state, numCorrect: state.numCorrect + 1 };
    case SET_GAME_STATE:
      return { ...state, gameState: state.gameState };
    case RESET_GAME:
      return {
        ...state,
        questions: [],
        roundNum: 0,
        numCorrect: 0,
      };
    case FETCH_TRACKS_PENDING:
      return { ...state, isLoading: true };
    case FETCH_TRACKS_SUCCESS:
      return { ...state, isLoading: false, tracks: action.tracks };
    case FETCH_TRACKS_FAILURE:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export const setTracks = (tracks) => {
  return {
    type: SET_TRACKS,
    tracks,
  };
};

export const incrementRound = () => {
  return {
    type: INCREMENT_ROUND,
  };
};

export const setQuestions = (questions) => {
  return {
    type: SET_QUESTIONS,
    questions,
  };
};

export const incrementCorrect = () => {
  return {
    type: INCREMENT_CORRECT,
  };
};

export const setGameState = (gameState) => {
  return {
    type: SET_GAME_STATE,
    gameState,
  };
};

export const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};

export const fetchTracksPending = (artistId) => {
  return {
    type: FETCH_TRACKS_PENDING,
    artistId,
  };
};

export const fetchTracksSuccess = (tracks) => {
  return {
    type: FETCH_TRACKS_SUCCESS,
    tracks,
  };
};

export const fetchTracksFailure = () => {
  return {
    type: FETCH_TRACKS_FAILURE,
  };
};

export const createQuestions = () => {
  return async (dispatch, getState) => {
    const NUM_QUESTIONS = 1;
    const CHOICES_PER_QUESTION = 4;

    const getRandomIndex = (maxNum) => Math.floor(Math.random() * maxNum - 1) + 1;
    const { tracks } = getState().game;
    const copiedTracks = [...tracks];
    shuffle(copiedTracks);

    const questions = [];
    for (let i = 0; i < NUM_QUESTIONS; i++) {
      const choices = [];
      for (let j = 0; j < CHOICES_PER_QUESTION; j++) {
        const idx = i * CHOICES_PER_QUESTION + j;
        choices.push(copiedTracks[idx]);
      }

      const randIdx = getRandomIndex(CHOICES_PER_QUESTION);
      const q = {
        correctId: choices[randIdx].id,
        choices,
      };

      questions.push(q);
    }

    dispatch(setQuestions(questions));
  };
};

export const createGame = (artistId) => {
  return async (dispatch) => {
    dispatch(fetchTracksPending());

    try {
      const tracks = await api.getTracks(artistId);
      dispatch(fetchTracksSuccess(tracks));
      dispatch(createQuestions());
    } catch (error) {
      dispatch(fetchTracksFailure());
    }
  };
};

// export const replayGame = () => {
//   return async (dispatch) => {
//     dispatch(fetchTracksPending());

//     try {
//       const tracks = api.getTracks(artistId);
//       dispatch(fetchTracksSuccess(tracks));
//     } catch (error) {
//       dispatch(fetchTracksFailure());
//     }
//   };
// };

export default reducer;
