import React from 'react';
import './GoogleMap.css';
import haversine from 'haversine';
/*global google*/
class GoogleMap extends React.Component {

  shouldComponentUpdate() { // The component will render once and after that will not, we want it to behave like that, react isn't in charge of rendering the map, google API is.
    return false;
  }

  componentWillReceiveProps(nextProps) {
    const map = this.map;
    map.panTo({lat: nextProps.lat, lng: nextProps.lng});
    const filteredByRadius = nextProps.markers.filter( position => {
      return haversine({lat: nextProps.lat, lng: nextProps.lng}, position, {threshold: 1100, unit: 'meter'} )
    });
    console.log('Not filtered', nextProps.markers);
    console.log('Filtered by radius',filteredByRadius);

    const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    const myLocation = new google.maps.Marker({
      position: {lat: nextProps.lat, lng: nextProps.lng},
      map: map,
      icon: image
    });

    if (!filteredByRadius.length) return;

    const bounds = new google.maps.LatLngBounds();
    
    const googleMarkers = filteredByRadius.map(position => {
      bounds.extend(position);
      const marker = new google.maps.Marker({map, position});
      return marker;
    });

    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.googleMap, {
      center: {lat: this.props.lat, lng: this.props.lng},
      zoom: 10
    });

    this.dropdown = new google.maps.places.Autocomplete(this.textInput);
    this.dropdown.addListener('place_changed', () => {
      this.props.handleInput(this.dropdown.getPlace());
    });
  }

  render() {
    return(
      <div className="wrapper">
        <input ref={(input) => { this.textInput = input; }} className="input-field" type="text" placeholder="Search..."/>
        <div id="map" ref={(map) => { this.googleMap = map; }}/>
      </div>
    );
  }
}

export default GoogleMap;