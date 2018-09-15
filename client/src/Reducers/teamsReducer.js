import { MY_TEAMS_SUCCESS, OPEN_CREATE_TEAM_MODAL, CLOSE_CREATE_TEAM_MODAL,
        CREATE_TEAM_FAILED, CREATE_TEAM_SUCCESS, TEAM_INVITE_FAILED,
        TEAM_INVITE_SUCCESS, OPEN_TEAM_INVITE_MODAL, CLOSE_TEAM_INVITE_MODAL } from '../actions';



export default (state = {
  myTeams: [],
  allTeams:{},
  createTeamModal: false,
  teamInviteModal: false,
  activeTeam: null
}, action) => {
  switch(action.type){
    case MY_TEAMS_SUCCESS: {
      let myTeamIds = action.payload.map(team => team._id);
      let addedTeams = {};
      action.payload.forEach(team => {
        addedTeams[team._id] = team;
      });
      return Object.assign({}, state, {
        myTeams: myTeamIds,
        allTeams: Object.assign({}, state.allTeams, addedTeams)
      })
    }
    case OPEN_CREATE_TEAM_MODAL: {
      return Object.assign({}, state, {createTeamModal: true})
    }
    case CLOSE_CREATE_TEAM_MODAL: {
      return Object.assign({}, state, {createTeamModal: false})
    }
    case CREATE_TEAM_SUCCESS: {
      let myTeamIds = state.myTeams.slice();
      myTeamIds.push(action.payload._id);
      let addedTeam = {};
      addedTeam[action.payload._id] = action.payload;
      return Object.assign({}, state, {
        myTeams: myTeamIds,
        allTeams: Object.assign({}, state.allTeams, addedTeam)
      })
    }
    case CREATE_TEAM_FAILED: {
      return {...state}
    }
    case TEAM_INVITE_FAILED: {
      return {...state}
    }
    case TEAM_INVITE_SUCCESS: {
      return {...state}
    }
    case OPEN_TEAM_INVITE_MODAL: {
      return {...state, teamInviteModal: true, activeTeam: action.payload}
    }
    case CLOSE_TEAM_INVITE_MODAL: {
      return {...state, teamInviteModal: false, activeTeam: null}
    }
    default:
    return {...state}
  }
};
