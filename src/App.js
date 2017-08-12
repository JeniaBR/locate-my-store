import React, { Component } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import InputField from './components/InputField';
import GoogleMap from './components/GoogleMap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoaded: false
    }
  }

  componentDidMount(){
    loadGoogleMapsAPI({
      key: 'AIzaSyANVMIa2kKo4YT82L6sP5NN1MTeYUrGTpc'
    })
    .then((googleAPI) => {
      this.googleAPI = googleAPI;
      this.setState({apiLoaded: true})
    });
  }

  render() {
    return (
      <div className="App">
        <InputField />
        {this.state.apiLoaded ? <GoogleMap/> : <h2>Loading Google Maps API</h2>}
      </div>
    );
  }
}

export default App;
