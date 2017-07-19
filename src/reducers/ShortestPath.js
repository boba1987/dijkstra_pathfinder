import * as types from '../constants/HomeActionTypes';

export default function ShortestPath(state = {}, action) {
  switch (action.type) {
    case types.GET_SHORTEST_PATH:
      {
        const worker = new Worker('./worker.js');
        worker.postMessage(action);

        let actionPromise = new Promise((resolve, reject) => {
          worker.addEventListener('message', function(e) {
            resolve(e.data);
            worker.terminate();
          }, false);

          worker.addEventListener('error', function(e) {
            reject(e);
          }, false);
        });

        return actionPromise;
      }
    default:
      return state;
  }
}
