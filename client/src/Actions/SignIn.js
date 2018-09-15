import { SIGN_IN_FAILED, SIGN_IN_SUCCESS, REMOVE_FAILED_ERROR } from '../actions.js';
import axios from 'axios';

export function trySignIn(userInfo) {
  return (dispatch) => {
    axios.post('/api/auth', userInfo)
    .then(res => {
      if(res.data.error){
        dispatch(signInFailed(res.data.error))
      }else{
        dispatch(signInSuccess(res.data))
      }
    })
    .catch(err => {
      dispatch(signInFailed('An error occurred'))
    })
  }
}

function signInSuccess(payload) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: payload
  }
}

function signInFailed(payload) {
  return (dispatch) => {
    dispatch({
      type: SIGN_IN_FAILED,
      payload: payload
    })
    setTimeout(() => {
      dispatch(removeFailedError())
    }, 2500)
  }
}

function removeFailedError() {
  return {
    type: REMOVE_FAILED_ERROR
  }
}
