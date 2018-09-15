import { SIGN_UP_FAILED, REMOVE_FAILED_ERROR } from '../actions';



export default (state = {error: null}, action) => {
  switch(action.type){
    case SIGN_UP_FAILED: {
      return Object.assign({}, state, {error: action.payload})
    }
    case REMOVE_FAILED_ERROR: {
      return Object.assign({}, state, {error: null})
    }
    default:
    return {...state}
  }
};
