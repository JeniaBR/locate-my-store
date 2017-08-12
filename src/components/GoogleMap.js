import React from 'react';
import './GoogleMap.css';
/*global google*/
class GoogleMap extends React.Component {

  shouldComponentUpdate() { // The component will render once and after that will not, we want it to behave like that, react isn't in charge of rendering the map, google API is.
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.map.panTo({lat: nextProps.lat, lng: nextProps.lng});
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