import { OPEN_CREATE_TEAM_MODAL, CLOSE_CREATE_TEAM_MODAL,
  CREATE_TEAM_FAILED, CREATE_TEAM_SUCCESS, TEAM_INVITE_FAILED,
  TEAM_INVITE_SUCCESS, OPEN_TEAM_INVITE_MODAL, CLOSE_TEAM_INVITE_MODAL } from '../actions.js';

import axios from 'axios';


export function openTeamInviteModal(teamId){
  return {
    type: OPEN_TEAM_INVITE_MODAL,
    payload: teamId
  }
}

export function closeTeamInviteModal(){
  return {
    type: CLOSE_TEAM_INVITE_MODAL
  }
}

export function tryInvite(inviteInfo, token){
  return (dispatch) => {
    axios.post('/api/teaminvites', inviteInfo, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(res => {
      if(res.data.error){
        dispatch(inviteFailed(res.data.error))
      }else{
        dispatch(inviteSuccess(res.data))
      }
    })
    .catch(inviteFailed('an error occurred'))
  }
}

export function inviteFailed(payload){
  return {
    type: TEAM_INVITE_FAILED,
    payload: payload
  }
}

export function inviteSuccess(){
  return {
    type: TEAM_INVITE_SUCCESS
  }
}

export function openCreateTeamModal(){
  return {
    type: OPEN_CREATE_TEAM_MODAL
  }
}

export function closeCreateTeamModal(){
  return {
    type: CLOSE_CREATE_TEAM_MODAL
  }
}

export function tryCreateTeam(teamInfo, token) {
  return (dispatch) => {
    axios.post('/api/teams', teamInfo,{
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(res => {
      if(res.data.error){
        dispatch(createTeamFailed(res.data.error))
      }else{
        dispatch(createTeamSuccess(res.data))
      }
    })
    .catch(err => {
      dispatch(createTeamFailed('An error occurred'))
    })
  }
}

function createTeamFailed(payload){
  return {
    type: CREATE_TEAM_FAILED,
    payload: payload
  }
}

function createTeamSuccess(payload){
  return {
    type: CREATE_TEAM_SUCCESS,
    payload: payload
  }
}
