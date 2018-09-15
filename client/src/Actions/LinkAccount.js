import axios from 'axios';
import { ACCOUNT_LINK_FAILED, ACCOUNT_LINK_SUCCESS, REMOVE_FAILED_ERROR } from '../actions';

export function tryAccountLink(payload) {
  return (dispatch) => {
    axios.put('/api/riot', payload, {
      headers: {"Authorization": `Bearer ${window.localStorage.userToken}`}
    })
    .then(res => {
      if(res.data.error){
        dispatch(accountLinkFailed(res.data.error))
      }else{
        dispatch(accountLinkSuccess(res.data))
      }
    })
    .catch(err =>{
      dispatch(accountLinkFailed('An error occurred'))
    })
  }
}


function accountLinkFailed(payload){
  return (dispatch) => {
    dispatch({
      type: ACCOUNT_LINK_FAILED,
      payload: payload
    })
    setTimeout(() => {
      dispatch(removeFailedError())
    }, 2500)
  }
}

function accountLinkSuccess(payload){
  return {
    type: ACCOUNT_LINK_SUCCESS,
    payload: payload
  }
}

function removeFailedError() {
  return {
    type: REMOVE_FAILED_ERROR
  }
}
