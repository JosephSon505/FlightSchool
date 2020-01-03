// imports and css
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// get pages from /pages
import Notfound from './view/page/Notfound';
import SignIn from './view/page/Signin';
import SignUp from './view/page/Signup';
import Home from './view/page/Home';
import Blocks from './view/page/Blocks';
import Team from './view/page/Team';

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

// routes for pages
const routing = (
    <MuiThemeProvider theme={theme}>
        <div>
        <Router>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/home" component={Home} />
                <Route path="/blocks" component={Blocks} />
                <Route path="/team" component={Team} />
                <Route component={Notfound} />
            </Switch>
        </Router>
        </div>
    </MuiThemeProvider>
);

ReactDOM.render(routing, document.getElementById('root'));