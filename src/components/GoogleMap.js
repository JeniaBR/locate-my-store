import React from 'react';
import './GoogleMap.css';
/*global google*/
class GoogleMap extends React.Component {

  shouldComponentUpdate() { // The component will render once and after that will not, we want it to behave like that, react isn't in charge of rendering the map, google API is.
    return false;
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.googleMap, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  render() {
    return(
      <div id="map" ref={(map) => { this.googleMap = map; }}>This is My MAP!</div>
    );
  }
}

export default GoogleMap;