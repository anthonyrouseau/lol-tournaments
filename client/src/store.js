import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducers/index.js';

export default createStore(reducer, applyMiddleware(thunk))
