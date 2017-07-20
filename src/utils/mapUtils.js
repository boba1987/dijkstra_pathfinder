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
    deferred.resolve(toReturn);
  });

  return deferred.promise;
};
