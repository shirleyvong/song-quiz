import shuffle from 'knuth-shuffle-seeded';
import api from '../services/api';

const MIN_TRACKS = 10;
const NUM_QUESTIONS = 5;
const CHOICES_PER_QUESTION = 4;

const SET_TRACKS = 'SET_TRACKS';
const INCREMENT_QUESTION = 'INCREMENT_QUESTION';
const SET_QUESTIONS = 'SET_QUESTIONS';
const INCREMENT_CORRECT = 'INCREMENT_CORRECT';
const SET_GAME_STATE = 'SET_GAME_STATE';
const RESET_GAME = 'RESET_GAME';

export const GAME_STATE = {
  LOADING: 'LOADING',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  ERROR: 'ERROR',
  UNSUPPORTED_ARTIST: 'UNSUPPORTED_ARTIST',
};

const initialState = {
  tracks: [],
  questions: [],
  questionNum: 0,
  numCorrect: 0,
  gameState: GAME_STATE.LOADING,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACKS:
      return { ...state, tracks: action.tracks };
    case INCREMENT_QUESTION:
      return { ...state, questionNum: state.questionNum + 1 };
    case SET_QUESTIONS:
      return { ...state, questions: action.questions };
    case INCREMENT_CORRECT:
      return { ...state, numCorrect: state.numCorrect + 1 };
    case SET_GAME_STATE:
      return { ...state, gameState: action.gameState };
    case RESET_GAME:
      return {
        ...state,
        questions: [],
        questionNum: 0,
        numCorrect: 0,
      };
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

export const incrementQuestion = () => {
  return {
    type: INCREMENT_QUESTION,
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

export const createQuestions = () => {
  return async (dispatch, getState) => {
    dispatch(setGameState(GAME_STATE.LOADING));

    const { tracks } = getState().game;
    if (tracks.length < MIN_TRACKS) {
      dispatch(setGameState(GAME_STATE.UNSUPPORTED_ARTIST));
      return;
    }

    const copiedTracks = [...tracks];
    shuffle(copiedTracks);
    const questions = [];

    for (let i = 0; i < NUM_QUESTIONS; i++) {
      const track = copiedTracks.pop();
      questions.push({
        songUrl: track.previewUrl,
        correctId: track.id,
        choices: [track],
      });
    }

    let tracksIdx = 0;
    for (let i = 0; i < NUM_QUESTIONS; i++) {
      for (let j = 0; j < CHOICES_PER_QUESTION - 1; j++) {
        questions[i].choices.push(copiedTracks[tracksIdx]);
        if (++tracksIdx >= copiedTracks.length) {
          tracksIdx = 0;
        }
      }
      shuffle(questions[i].choices);
    }

    dispatch(setQuestions(questions));
    dispatch(setGameState(GAME_STATE.IN_PROGRESS));
  };
};

export const createGame = (artistId) => {
  return async (dispatch) => {
    dispatch(setGameState(GAME_STATE.LOADING));
    dispatch(resetGame());

    try {
      const tracks = await api.getTracks(artistId);
      dispatch(setTracks(tracks));
      dispatch(createQuestions());
      await api.addRecentlyPlayed(artistId);
    } catch (error) {
      dispatch(setGameState(GAME_STATE.ERROR));
    }
  };
};

export const finishQuestion = () => {
  return async (dispatch, getState) => {
    const { questionNum } = getState().game;
    if (questionNum + 1 < NUM_QUESTIONS) {
      dispatch(incrementQuestion());
    } else {
      dispatch(setGameState(GAME_STATE.DONE));
    }
  };
};



export const replayGame = () => {
  return async (dispatch) => {
    dispatch(setGameState(GAME_STATE.LOADING));
    dispatch(resetGame());

    try {
      dispatch(createQuestions());
    } catch (error) {
      dispatch(setGameState(GAME_STATE.ERROR));
    }
  };
};

export default reducer;
