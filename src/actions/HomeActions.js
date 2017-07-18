import * as types from '../constants/HomeActionTypes';

export function getShortestPath() {
  return {
    type: types.GET_SHORTEST_PATH
  };
}
