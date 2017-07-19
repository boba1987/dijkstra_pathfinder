import * as types from '../constants/HomeActionTypes';

export function getShortestPath(paths, from, to, criteria) {
  return {
    paths,
    from,
    to,
    criteria,
    type: types.GET_SHORTEST_PATH
  };
}
