import axios from 'axios';
import { MY_TEAMS_SUCCESS, MY_TEAMS_FAILED, MY_INVITES_FAILED, MY_INVITES_SUCCESS } from '../actions';


export function getMyInvites(payload){
  return (dispatch) => {
    axios.get(`/api/teaminvites/by-user/${payload}`)
    .then(res => {
      if(res.data.error){
        dispatch(getMyInvitesFailed(res.data.error))
      }else{
        dispatch(getMyInvitesSuccess(res.data))
      }
    })
    .catch(err => console.log(err))
  }
}

function getMyInvitesFailed(payload){
  return {
    type: MY_INVITES_FAILED,
    payload: payload
  }
}

function getMyInvitesSuccess(payload){
  return {
    type: MY_INVITES_SUCCESS,
    payload: payload
  }
}

export function getMyTeams(payload){
  return (dispatch) => {
    axios.get(`/api/teams/by-user/${payload}`)
    .then(res => {
      if(res.data.error){
        dispatch(getMyTeamsFailed(res.data.error))
      }else{
        dispatch(getMyTeamsSuccess(res.data))
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}

function getMyTeamsFailed(payload){
  return {
    type: MY_TEAMS_FAILED,
    payload: payload
  }
}

function getMyTeamsSuccess(payload){
  return {
    type: MY_TEAMS_SUCCESS,
    payload: payload
  }
}
