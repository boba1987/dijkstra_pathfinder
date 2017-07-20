const Q = require('q');

module.exports = function GetCoords(cities) {
  const deferred = Q.defer();
  let toReturn = [];

  let qArr = [];

  for (let i=0;i<cities.length;i++) {
    qArr.push(
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + cities[i]).then(result => {
        return result.json();
      }).then(function(data) {
        toReturn.push(data.results[0]);
      }).catch(function(err) {
        throw new Error('Fetching maps data error: ', err);
      })
    );
  }

  Q.all(qArr).then(function(){
    let sortedToReturn = new Array(cities.length);
    // Sort array to return according to original path
    for (let i=0;i<toReturn.length;i++) {
      sortedToReturn[cities.indexOf(toReturn[i].formatted_address.split(',')[0])] = toReturn[i];
    }
    deferred.resolve(sortedToReturn);
  });

  return deferred.promise;
};
