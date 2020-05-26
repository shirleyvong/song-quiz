import {
  SET_ACCESS_TOKEN,
  SET_ACCESS_TOKEN_EXPIRY
} from '../actionTypes'


export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken
  };
}

export function setAccessTokenExpiry(accessTokenExpiry) {
  return {
    type: SET_ACCESS_TOKEN_EXPIRY,
    accessTokenExpiry
  }
}
