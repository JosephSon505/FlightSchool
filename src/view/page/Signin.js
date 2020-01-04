import React from 'react'
// import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

// Material UI Imports
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Axios Import
import axios from 'axios';

import '../css/App.css'

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '20px auto 20px auto'
    },
    button: {
        margin: '40px auto 0px auto',
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem', 
        marginTop: '20'
    },
    progress: {
        position: 'absolute',
    }
};

class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {},
            emailError: '',
            passwordError: ''
        };
    }

    render() {
        const { classes } = this.props;
        const { errors, emailError, passwordError, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Flight School
                    </Typography>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Log In
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField 
                            id='email' 
                            name='email' 
                            type='email' 
                            label='Email'
                            variant='outlined' 
                            className={classes.textField} 
                            helperText={emailError}
                            error={emailError ? true : false}
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id='password' 
                            name='password' 
                            type='password' 
                            label='Password'
                            variant='outlined'  
                            className={classes.textField} 
                            helperText={passwordError}
                            error={passwordError ? true : false}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type='submit'variant='contained' color='primary' className={classes.button} fullWidth disabled={loading}>
                            Log In
                            {loading && (
                                <CircularProgress size={26} className={classes.progress} />
                            )}
                        </Button>
                        <Button variant='contained' color='secondary' onClick={this.handleSignUp} className={classes.button} fullWidth>
                            Sign Up
                        </Button>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post('/login', userData).then(res => {
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            this.setState({
                loading: false
            });
            this.props.history.push('/home');
        }).catch(err => {
            this.setState({
                errors: err.response.data,
                emailError: err.response.data.errors ? err.response.data.errors.email : '',
                passwordError: err.response.data.errors ? err.response.data.errors.password : '',
                loading: false
            });
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSignUp = (event) => {
        this.props.history.push('/signup');
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignIn);