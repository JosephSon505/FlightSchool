import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

// css
import '../css/Navbar.css';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/home" >
                        Flight School
                    </Button>
                    <Button color="inherit" component={Link} to="/team" >
                        Team
                    </Button>
                    <Button color="inherit" component={Link} to="/blocks" >
                        Training
                    </Button>
                    <Button color="inherit" component={Link} to="/Accout" >
                        Account
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar