import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLoggedUser} from '../utils/auth';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isLoggedUser() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/home",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);
export default PublicRoute;