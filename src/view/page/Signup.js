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
        margin: '8px auto 8px auto'
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
    },
    cancel: {
        marginTop: '20px',
        marginBottom: '50px'
    }
};

class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            handle: '',
            loading: false,
            errors: {},
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            firstNameError: '',
            lastNameError: '',
            handleError: ''
        };
    }

    render() {
        const { classes } = this.props;
        const { errors, emailError, passwordError, confirmPasswordError, firstNameError, lastNameError, handleError, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Flight School
                    </Typography>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField 
                            id='firstName' 
                            name='firstName' 
                            type='text' 
                            label='First Name' 
                            variant='outlined' 
                            className={classes.textField} 
                            helperText={firstNameError}
                            error={firstNameError ? true : false}
                            value={this.state.firstName} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id='lastName' 
                            name='lastName' 
                            type='text' 
                            label='Last Name' 
                            variant='outlined' 
                            className={classes.textField} 
                            helperText={lastNameError}
                            error={lastNameError ? true : false}
                            value={this.state.lastName} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
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
                        <TextField 
                            id='confirmPassword' 
                            name='confirmPassword' 
                            type='password' 
                            label='Confirm Password'
                            variant='outlined'  
                            className={classes.textField} 
                            helperText={confirmPasswordError}
                            error={confirmPasswordError ? true : false}
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id='handle' 
                            name='handle' 
                            type='text' 
                            label='Handle' 
                            variant='outlined' 
                            className={classes.textField} 
                            helperText={handleError}
                            error={handleError ? true : false}
                            value={this.state.handle} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type='submit'variant='contained' color='primary' className={classes.button} fullWidth disabled={loading}>
                            Sign Up
                            {loading && (
                                <CircularProgress size={26} className={classes.progress} />
                            )}
                        </Button>
                        <Button variant='contained' color='secondary' onClick={this.handleCancel} className={classes.cancel} fullWidth>
                            Cancel
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

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            handle: this.state.handle
        };

        axios.post('/signup', newUserData).then(res => {
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            this.setState({
                loading: false
            });
            this.props.history.push('/home');
        }).catch(err => {
            console.log(err.response.data)
            this.setState({
                errors: err.response.data,
                emailError: err.response.data.errors ? err.response.data.errors.email : '',
                passwordError: err.response.data.errors ? err.response.data.errors.password : '',
                confirmPasswordError: err.response.data.errors ? err.response.data.errors.confirmPassword : '',
                firstNameError: err.response.data.errors ? err.response.data.errors.firstName : '',
                lastNameError: err.response.data.errors ? err.response.data.errors.lastName : '',
                handleError: err.response.data.errors ? err.response.data.errors.handle : '',
                loading: false
            });
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCancel = (event) => {
        this.props.history.push('/');
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignUp);