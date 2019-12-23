import React from 'react'
import '../css/App.css'
import fire from '../../config/fire'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <Form className="login-form" onSubmit = {this.signup}>
                <h1 className="text-center" >Flight School</h1>
                <h2 className="text-center" >Sign Up</h2>

                <FormGroup>
                    <Label>Name</Label>
                    <Input name="name" type="text" placeholder="Name" onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label>Email</Label>
                    <Input name="email" type="email" placeholder="Email" onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input name="password" type="password" placeholder="password" onChange={this.handleChange} />
                </FormGroup>

                <Button className="btn-lrg btn-dark btn-block mt-3" onClick = {this.signup}>Sign Up</Button>

                <div className="text-center mt-3">
                    <a href="/">Cancel</a>
                </div>
            </Form>
        )
    }

    signup(e) {
        e.preventDefault();

        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.props.history.push("/")
        }).then((u) => { 
            console.log(u) 
        }).catch((error) => {
            console.log(error);
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

}

export default SignUp