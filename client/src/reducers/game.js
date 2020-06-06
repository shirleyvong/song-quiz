const SET_TRACKS = 'SET_TRACKS';
const INCREMENT_ROUND = 'INCREMENT_ROUND';
const SET_QUESTIONS = 'SET_QUESTIONS';
const INCREMENT_CORRECT = 'INCREMENT_CORRECT';
const SET_GAME_STATE = 'SET_GAME_STATE';

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

export default reducer;
