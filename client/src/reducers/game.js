import shuffle from 'knuth-shuffle-seeded';
import api from '../services/api';

const NUM_QUESTIONS = 1;
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
