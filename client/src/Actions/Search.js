import { USER_SEARCH_SUCCESS, USER_SEARCH_FAILED } from '../actions.js';
import axios from 'axios';

export function trySearchUser(searchInfo) {
  return (dispatch) => {
    axios.get(`/api/users/search/${searchInfo.value}/${searchInfo.offset}`)
    .then(res => {
      if(res.data.error){
        dispatch(searchUserFailed(res.data.error))
      }else{
        dispatch(searchUserSuccess(res.data))
      }
    })
    .catch(err => {
      dispatch(searchUserFailed('An error occurred'))
    })
  }
}

function searchUserSuccess(payload){
  return {
    type: USER_SEARCH_SUCCESS,
    payload: payload
  }
}

function searchUserFailed(payload){
  return {
    type: USER_SEARCH_FAILED,
    payload: payload
  }
}
