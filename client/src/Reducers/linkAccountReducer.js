import { ACCOUNT_LINK_FAILED, ACCOUNT_LINK_SUCCESS, REMOVE_FAILED_ERROR } from '../actions';



export default (state = {error: null}, action) => {
  switch(action.type){
    case ACCOUNT_LINK_FAILED: {
      return Object.assign({}, state, {error: action.payload})
    }
    case ACCOUNT_LINK_SUCCESS: {
      return {...state}
    }
    case REMOVE_FAILED_ERROR: {
      return Object.assign({}, state, {error: null})
    }
    default:
    return {...state}
  }
};
