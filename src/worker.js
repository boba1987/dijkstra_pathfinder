/**
 * Basic priority queue implementation.
 */
function PriorityQueue () {
    this._nodes = [];

    /**
    * Push all generated nodes
    */
    this.enqueue = function (priority, key) {
        this._nodes.push({key: key, priority: priority });
        this.sort();
    };
    this.dequeue = function () {
        return this._nodes.shift().key;
    };
    /**
    * Sort all generated nodes by priority - cost, time
    */
    this.sort = function () {
        this._nodes.sort(function (a, b) {
            return a.priority - b.priority;
        });
    };
    /**
    Check if all nodes are visited
    */
    this.isEmpty = function () {
        return !this._nodes.length;
    };
}

/**
 * Pathfinding starts here
 */
function Graph(){
    let INFINITY = 1/0;
    this.vertices = {};

    /**
    * Generate graph nodes
    */
    this.addVertex = function(name, edges){
        this.vertices[name] = edges;
    };

    /**
    * Generate graph
    */
    this.shortestPath = function (start, finish) {
        let nodes = new PriorityQueue(),
            distances = {},
            previous = {},
            path = [],
            smallest, vertex, neighbor, alt;

        for(vertex in this.vertices) {
            if(vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            }
            else {
                distances[vertex] = INFINITY;
                nodes.enqueue(INFINITY, vertex);
            }

            previous[vertex] = null;
        }

        while(!nodes.isEmpty()) {
            smallest = nodes.dequeue();

            if(smallest === finish) {
                path = [];

                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }

                break;
            }

            if(!smallest || distances[smallest] === INFINITY){
                continue;
            }

            for(neighbor in this.vertices[smallest]) {
                alt = distances[smallest] + this.vertices[smallest][neighbor];

                if(alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;

                    nodes.enqueue(alt, neighbor);
                }
            }
        }

        return path;
    };
}

/**
* Extract only criteria of interest
*/
function reduceVertexInfo(info, e) {
    for (let dep in info) {
        for (let arr in info[dep]) {
            info[dep][arr] = info[dep][arr][0][e.data.criteria];
        }
    }

    return info;
}

/**
* Format response so it can be used by Pathfinding algorithm
*/
function getVertexInfo(response, e) {
    let info = {};

    response.forEach(function (deal) {
      deal.durationMinutes = (parseInt(deal.duration.h)*60) + parseInt(deal.duration.m);
      deal.priceTotal = deal.cost - (deal.cost*(deal.discount/100));
      if (info[deal.departure]) {
          if (info[deal.departure][deal.arrival]) {
              info[deal.departure][deal.arrival].push(deal); // deal.cost - deal.discount    // deal.miliseconds     // etc.
          } else {
              info[deal.departure][deal.arrival] = [deal];
          }
      } else {
          info[deal.departure] = {};
          info[deal.departure][deal.arrival] = [deal];
      }
    });

    for (let dep in info) {
      for (let arr in info[dep]) {
        info[dep][arr].sort(function (l, r) {
            return l[e.data.criteria] - r[e.data.criteria];
        });
      }
    }

    return info;
}

self.addEventListener('message', function(e) {
  const data = e.data;
  const response = data.paths;

  let reduced_info = reduceVertexInfo(getVertexInfo(response, e), e); // to avoid mutation

  let graph = new Graph();

  for (let vertex in reduced_info) {
      graph.addVertex(vertex, reduced_info[vertex]);
  }

  const shortestPath = graph.shortestPath(e.data.from, e.data.to).concat([e.data.from]).reverse();

  let info = getVertexInfo(response, e);

  let toReturn = [];

  for (let i=0; i < shortestPath.length-1; i++) {
    let curr = shortestPath[i];
    let next = shortestPath[i+1];
    toReturn.push({
      from: curr,
      to: info[curr][next][0]
    });
  }

  self.postMessage(toReturn);
}, false);
