import * as types from '../constants/HomeActionTypes';

export default function ShortestPath(state = {}, action) {
  switch (action.type) {
    /**
    Start a web worker and do all the path drawing and path calcualtions there,
    so all heavy operations are moved away from the page context
    */
    case types.GET_SHORTEST_PATH:
      {
        const worker = new Worker('./worker.js');
        worker.postMessage(action);

        /**
        Return a primise, since some time is needed for a web worker
        to do it's stuff
        */
        let actionPromise = new Promise((resolve, reject) => {
          worker.addEventListener('message', function(e) {
            resolve(e.data);
            worker.terminate(); // Close connection witn web worker
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
