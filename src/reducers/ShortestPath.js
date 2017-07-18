import * as types from '../constants/HomeActionTypes';

export default function ShortestPath(state = {}, action) {
  switch (action.type) {
    case types.GET_SHORTEST_PATH:
      {
        console.log(action);
        return action;
      }
    default:
      return state;
  }
}
