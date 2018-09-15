import { ACCEPT_INVITE_FAILED, ACCEPT_INVITE_SUCCESS } from '../actions.js';

import axios from 'axios';

export function tryAcceptInvite(info, token){
  return (dispatch) => {
    axios.put('/api/teams', info, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(res => {
      if(res.data.error){
        dispatch(acceptInviteFailed(res.data.error))
      }else{
        dispatch(acceptInviteSuccess(info.inviteId))
      }
    })
    .catch(acceptInviteFailed('an error occurred'))
  }
}

export function acceptInviteFailed(payload){
  return {
    type: ACCEPT_INVITE_FAILED,
    payload: payload
  }
}

export function acceptInviteSuccess(inviteId){
  return {
    type: ACCEPT_INVITE_SUCCESS,
    payload: inviteId
  }
}
