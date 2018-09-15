import { SIGN_UP_SUCCESS, SIGN_IN_SUCCESS, SIGN_OUT } from '../actions';



export default (state = {
  user: window.localStorage.getItem("userId") || null,
  token: window.localStorage.getItem("userToken") || null
}, action) => {
  switch(action.type){
    case SIGN_UP_SUCCESS: {
      window.localStorage.setItem("userId", action.payload.id)
      window.localStorage.setItem("userToken", action.payload.token)
      return Object.assign({}, state, {
        user: action.payload.id,
        token: action.payload.token
      })
    }
    case SIGN_IN_SUCCESS: {
      window.localStorage.setItem("userId", action.payload.id)
      window.localStorage.setItem("userToken", action.payload.token)
      return Object.assign({}, state, {
        user: action.payload.id,
        token: action.payload.token
      })
    }
    case SIGN_OUT: {
      window.localStorage.clear()
      return Object.assign({}, state, {user: null, token: null})
    }
    default:
    return {...state}
  }
};
