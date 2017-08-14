import React, { Component } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import GoogleMap from './components/GoogleMap';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoaded: false,
      lat: 32.085300,
      lng: 34.781768,
      markers: []
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
    
    axios.get('http://localhost:3003/stores')
      .then((res) => {
        const places = res.data;
        const markers = places.map( place => {
          return place.location;
        });

        this.setState({
          lat,
          lng,
          markers: [...markers]
        });
      })
      .catch((err) => {
        console.error(err);
      });

    
  }


  render() {
    if (this.state.apiLoaded) {
      return(
        <div className="App">
          <GoogleMap handleInput={this.handleInput} lat={this.state.lat} lng={this.state.lng} markers={this.state.markers}/>
        </div>
      );
    } else {
      return (<h2>Loding Google Maps API</h2>);
    }
  }
}

export default App;
