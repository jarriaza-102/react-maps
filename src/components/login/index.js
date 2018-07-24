import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {GoogleLogin} from 'react-google-oauth';
import {logUser} from '../../utils/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedUser: false
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
  }  
  
  onLoginSuccess(response) {
    console.log(response);
    logUser(response);
    this.setState({ isLoggedUser: true });
  }
    
  onLoginFailure(error) {
    console.log(error);
  }
  
  render() {
    console.log(this.state.isLoggedUser);
    if (this.state.isLoggedUser) {
        return (
            <Redirect to={{
                pathname: "/home"
            }} />
        );
    }
    return (
      <div>
        <GoogleLogin 
              		onLoginFailure={this.onLoginFailure}
                  onLoginSuccess={this.onLoginSuccess}/>
      </div>
    );
  }
}

export default Login;