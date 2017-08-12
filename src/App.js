import React, { Component } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import GoogleMap from './components/GoogleMap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoaded: false,
      lat: 31.0461,
      lng: 34.8516
    }
  }

  componentDidMount(){
    loadGoogleMapsAPI({
      key: 'AIzaSyANVMIa2kKo4YT82L6sP5NN1MTeYUrGTpc',
      libraries: ['places']
    })
    .then((googleAPI) => {
      this.googleAPI = googleAPI;
      this.setState({apiLoaded: true})
    });
  }

  handleInput = (placeObject) => {
    const lat = placeObject.geometry.location.lat();
    const lng = placeObject.geometry.location.lng();
    this.setState({
      lat,
      lng
    })
  }


  render() {
    if (this.state.apiLoaded) {
      return(
        <div className="App">
          <GoogleMap handleInput={this.handleInput} lat={this.state.lat} lng={this.state.lng}/>
        </div>
      );
    } else {
      return (<h2>Loding Google Maps API</h2>);
    }
  }
}

export default App;
