import * as types from '../constants/HomeActionTypes';

export function getShortestPath(paths, from, to) {
  return {
    paths,
    from,
    to,
    type: types.GET_SHORTEST_PATH
  };
}
