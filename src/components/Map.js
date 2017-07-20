import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import GetCoords from '../utils/mapUtils';

let map = null;
let Google = null;
let Path = null;
let markers = [];

class Map extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const el = document.getElementById('mapHolder');

    GoogleMapsLoader.LIBRARIES = ['visualization'];
    GoogleMapsLoader.KEY = 'AIzaSyCMHOzjzWM5NflaW76gpV_sOQ4117cewlY';
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
    });
  }

  componentWillUpdate(nextProps) {
    if (Path !== null) {
      Path.setMap(null);
    }

    if (markers.length) { // Reset markers
      for(let i=0; i<markers.length; i++) {
        markers[i].setMap(null);
      }
    }

    // get city coords with https://maps.googleapis.com/maps/api/geocode/json?address=Moscow
    nextProps.shortestPath.then(path => {
      let cities = [];
      for (let i=0;i<path.length;i++) { // Get all cities coords
        cities.push(path[i].from);

        if (i == path.length-1) { // Get the final destination
          cities.push(path[i].to.arrival);
        }
      }

      GetCoords(cities).then(res => {
        const PathCoordinates = [];

        for(let i=0; i<res.length;i++) {
          let label = '';
          if (i != 0) {
            label = i.toString();
          }

          let marker = new Google.maps.Marker({
            position: res[i].geometry.location,
            label: label,
            map: map
          });
          markers.push(marker);

          PathCoordinates.push(res[i].geometry.location);
        }

        let lineSymbol = {
          path: 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z',
          scale: 1,
          strokeColor: 'rgb(0, 188, 212)',
          fillColor: 'rgb(0, 188, 212)',
          fillOpacity: 1,
          strokeWeight: 3
        };

        Path = new Google.maps.Polyline({
          path: PathCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeWeight: 2,
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          map: map
        });

        animateCircle(Path);

        function animateCircle(line) {
          let count = 0;
          window.setInterval(function() {
            count = (count + 1) % 200;

            let icons = line.get('icons');
            icons[0].offset = (count / 2) + '%';
            line.set('icons', icons);
          }, 80);
        }
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
