import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// css
import '../css/Navbar.css';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    // This group of buttons will be aligned to the right
    rightToolbar: {
      marginLeft: 'auto',
      marginRight: '20px',
    },
    title: {
        marginLeft: '20px'
    }
};

class Navbar extends Component {
    
    constructor() {
        super();

        this.state = {
            account: null,
            training: null
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <AppBar>
                <Toolbar>
                    <Typography variant='h6' color="inherit" className={classes.title}>Flight School</Typography>

                    <section className={classes.rightToolbar}>
                        <Button className='button' color="inherit" component={Link} to="/home" >
                            <HomeSharpIcon />
                        </Button>         
                        <Button className='button' color="inherit" component={Link} to="/team" >
                            <GroupSharpIcon />
                        </Button>
                        <Button className='button' color="inherit" onClick={this.handleTrainingMenu} >
                            <FitnessCenterIcon />
                        </Button>
                        <Menu
                            id='fade-menu'
                            anchorEl={this.state.training}
                            keepMounted
                            open={Boolean(this.state.training)}
                            onClose={this.handleClose}
                        >
                            <MenuItem component={Link} to='/blocks'>Blocks</MenuItem>
                            <MenuItem component={Link} to='/rpe'>RPE Chart</MenuItem>
                        </Menu>

                        <Button color="inherit" onClick={this.handleAccountMenu}>
                            <AccountCircleIcon />
                        </Button>
                        <Menu
                            id='fade-menu'
                            anchorEl={this.state.account}
                            keepMounted
                            open={Boolean(this.state.account)}
                            onClose={this.handleClose}
                        >
                            <MenuItem component={Link} to='/user'>My Profile</MenuItem>
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </Menu>
                    </section>
                </Toolbar>
            </AppBar>
        );
    }

    handleAccountMenu = event => {
        this.setState({
            account: event.currentTarget
        })
    };
  
    handleTrainingMenu = event => {
        this.setState({
            training: event.currentTarget
        })
    }

    handleClose = () => {
        this.setState({
            account: null,
            training: null
        })
    };

    handleLogout = (event) => {
        console.log('User should be logged out now');
    }
}

export default withStyles(styles)(Navbar)