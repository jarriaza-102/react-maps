import React, { Component } from 'react';
import {GoogleAPI} from 'react-google-oauth'
import {MapContainer} from "./components/maps/MapContainer";
import './App.css';
import Dashboard from "./components/dashboard/index";

class App extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
        <GoogleAPI clientId="93296413379-iuigj4fhvq150gogp2i2cbvudcpncj12.apps.googleusercontent.com">
          <Dashboard />
        </GoogleAPI>
    );
  }
}

export default App;
