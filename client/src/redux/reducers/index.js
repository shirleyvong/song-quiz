import {
  SET_ACCESS_TOKEN,
  SET_ACCESS_TOKEN_EXPIRY
} from '../actionTypes'

const initialState = {
  accessToken: 'token',
  accessTokenExpiry: 77,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return [...state, action.accessToken];
    case SET_ACCESS_TOKEN_EXPIRY:
      return [...state, action.accessTokenExpiry];
    default:
      return state;
  }
}

export default reducers;
