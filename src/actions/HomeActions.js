import * as types from '../constants/HomeActionTypes';

export function getShortestPath(from, to) {
  return {
    from,
    to,
    type: types.GET_SHORTEST_PATH
  };
}
