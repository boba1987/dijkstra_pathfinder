import * as types from '../constants/HomeActionTypes';

export default function ShortestPath(state = {}, action) {
  switch (action.type) {
    case types.GET_SHORTEST_PATH:
      {
        const worker = new Worker('../worker.js');
        worker.postMessage(action);

        worker.addEventListener('message', function(e) {
          console.log('Worker said: ', e.data);
          worker.terminate();
        }, false);

        return action;
      }
    default:
      return state;
  }
}
