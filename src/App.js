import React, { Component } from 'react';
import {GoogleAPI} from 'react-google-oauth'
import Router from './route';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <GoogleAPI clientId="93296413379-iuigj4fhvq150gogp2i2cbvudcpncj12.apps.googleusercontent.com">
         <Router />
      </GoogleAPI>
    );
  }
}

export default App;
