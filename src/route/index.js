import React, {Component} from 'react';
import { BrowserRouter } from "react-router-dom";
import Login from '../components/login';
import Dashboard from '../components/dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

class Router extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <PublicRoute path="/login" component={Login} />
                    <PrivateRoute path="/home" component={Dashboard} />
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;