import { SIGN_UP_FAILED, SIGN_UP_SUCCESS, REMOVE_FAILED_ERROR } from '../actions.js';
import axios from 'axios';

export function trySignUp(userInfo) {
  return (dispatch) => {
    axios.post('/api/users', userInfo)
    .then(res => {
      if(res.data.error){
        dispatch(signUpFailed(res.data.error))
      }else{
        dispatch(signUpSuccess(res.data))
      }
    })
    .catch(err => {
      dispatch(signUpFailed('An error occurred'))
    })
  }
}

function signUpSuccess(payload) {
  return {
    type: SIGN_UP_SUCCESS,
    payload: payload
  }
}

export function signUpFailed(payload) {
  return (dispatch) => {
    dispatch({
      type: SIGN_UP_FAILED,
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
