// imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';

// redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

// css
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// get pages from /pages
import Notfound from './view/page/Notfound';
import SignIn from './view/page/Signin';
import SignUp from './view/page/Signup';
import Home from './view/page/Home';
import Blocks from './view/page/Blocks';
import Team from './view/page/Team';
import RPE from './view/page/RPE';

// Theme for website (USC colors)
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#d3555f',
            main: '#9d2235',
            dark: '#680010',
            contrastText: '#ffffff'
        },
        secondary: {
            light: '#fffa63',
            main: '#ffc72c',
            dark: '#c79700',
            contrastText: '#000000'
        }
    }
});

// logic to make sure if you are already logged in you don't need to log in again
let authenticated;
const token = localStorage.FBIdToken;
if(token) {
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/';
        authenticated = false;
    } else {
        authenticated = true;
    }
}

// routes for pages
// login and signup pages, pass in authenticated so that if you are already logged in you redirect to the homepage
const routing = (
    <MuiThemeProvider theme={theme}>
    <Provider store = {store}>
        <div>
        <Router>
            <Switch>
                <AuthRoute exact path='/' component={SignIn} authenticated = {authenticated} /> 
                <AuthRoute path='/signup' component={SignUp} authenticated = {authenticated} /> 
                <Route path='/home' component={Home} />
                <Route path='/blocks' component={Blocks} />
                <Route path='/rpe' component={RPE} />
                <Route path='/team' component={Team} />
                <Route component={Notfound} />
            </Switch>
        </Router>
        </div>
    </Provider>
    </MuiThemeProvider>
);

ReactDOM.render(routing, document.getElementById('root'));