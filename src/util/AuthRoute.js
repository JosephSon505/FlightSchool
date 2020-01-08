import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// if the user is already authenticated then don't go to login / signup page
// instead go directly to the homepage
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest} render={(props) => authenticated === true ? <Redirect to='/home' /> : <Component {...props}/> } />
)

export default AuthRoute