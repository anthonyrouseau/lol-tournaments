import { USER_SEARCH_FAILED, USER_SEARCH_SUCCESS } from '../actions';



export default (state = {
  users: [],
  teams: [],
  tournaments: []
}, action) => {
  switch(action.type){
    case USER_SEARCH_SUCCESS: {
      return Object.assign({}, state, {
        users: action.payload,
      })
    }
    case USER_SEARCH_FAILED: {
      return {...state}
    }
    default:
    return {...state}
  }
};
