import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import ShortestPath from './ShortestPath';

const rootReducer = combineReducers({
  ShortestPath,
  routing: routerReducer
});

export default rootReducer;
