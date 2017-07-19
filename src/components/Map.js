import React from 'react';
import GoogleMapsLoader from 'google-maps';

let map = null;
let Google = null;

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

      map = new google.maps.Map(el, mapOptions);
    });
  }

  render() {
    return (
      <div id="mapHolder"/>
    );
  }
}

export default Map;
