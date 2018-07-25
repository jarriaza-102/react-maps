import React, {Component} from 'react';
import {GoogleLogout} from 'react-google-oauth';

import MapContainer from '../maps/MapContainer';
import Container from '../custom-map/Container';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <div>
          <MapContainer />
        </div>
    );
  }
}

export default Dashboard;