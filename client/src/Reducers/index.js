import { combineReducers } from  'redux';
import userReducer from './userReducer';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import linkAccountReducer from './linkAccountReducer';
import teamsReducer from './teamsReducer';
import searchReducer from './searchReducer';
import invitesReducer from './invitesReducer';



export default combineReducers({
  userReducer,
  signupReducer,
  signinReducer,
  linkAccountReducer,
  teamsReducer,
  searchReducer,
  invitesReducer
})
