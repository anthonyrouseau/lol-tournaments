import { MY_INVITES_FAILED, MY_INVITES_SUCCESS, ACCEPT_INVITE_FAILED,
        ACCEPT_INVITE_SUCCESS} from '../actions';



export default (state = {
  myInvites:{},
}, action) => {
  switch(action.type){
    case MY_INVITES_FAILED: {
      return {...state}
    }
    case MY_INVITES_SUCCESS: {
      let invites = {};
      action.payload.forEach(invite => {
        invites[invite._id] = invite;
      })
      return {...state, myInvites: invites}
    }
    case ACCEPT_INVITE_FAILED: {
      return {...state}
    }
    case ACCEPT_INVITE_SUCCESS: {
      let invites = {...state.myInvites};
      delete invites[action.payload]
      return {...state, myInvites: invites}
    }
    default:
    return {...state}
  }
};
