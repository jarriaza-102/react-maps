import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {GoogleLogout} from 'react-google-oauth';
import {logoutAuthUser} from '../../utils/auth';
import Button from '@material-ui/core/Button';

import MapContainer from '../maps/MapContainer';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedUser: true
    };
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
  }
  
  onLogoutSuccess(response) {
    console.log(response);
    logoutAuthUser();
    this.setState({ isLoggedUser: false });
  }
  
  render() {
    if (!this.state.isLoggedUser) {
      return (
            <Redirect to={{
                pathname: "/login"
            }} />
        );
    }
    return (
      <div>
        Logged in
        <GoogleLogout onLogoutSuccess={this.onLogoutSuccess}/>
        <Button variant="contained">
          Hello World
        </Button>
        <MapContainer />
      </div>
    );
  }
}

export default Dashboard;