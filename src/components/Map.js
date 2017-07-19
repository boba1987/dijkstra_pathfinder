import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
const Q = require('q');

let map = null;
let Google = null;

function getCoords(cities) {
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
}

class Map extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const el = document.getElementById('mapHolder');

    GoogleMapsLoader.LIBRARIES = ['visualization'];
    GoogleMapsLoader.load(function(google) {
      Google = google;
      const mapOptions = {
        zoom: 4,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        center: {lat: 48, lng: 13.5},
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
      };

      map = new Google.maps.Map(el, mapOptions);

      const flightPlanCoordinates = [
          {lat: 48, lng: 6},
          {lat: 49, lng: 9},
        ];
      const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
    });
  }

  componentWillUpdate(nextProps) {
    // get city coords with https://maps.googleapis.com/maps/api/geocode/json?address=Moscow
    nextProps.shortestPath.then(path => {
      let cities = [];
      for (let i=0;i<path.length;i++) { // Get all cities coords
        cities.push(path[i].from);

        if (i == path.length-1) { // Get the final destination
          cities.push(path[i].to.arrival);
        }
      }

      getCoords(cities).then(res => {
        console.log(res);
      });
    });
  }

  render() {
    return (
      <div id="mapHolder"/>
    );
  }
}

Map.propTypes = {
  shortestPath: PropTypes.object.isRequired
};

export default Map;
