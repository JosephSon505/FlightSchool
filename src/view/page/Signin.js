import React from 'react'
import '../css/App.css'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import fire from '../../config/fire'

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: '',
            alert: '',
            isOpen: false
        }
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{ 
            this.props.history.push("/home")
        }).catch((error) => {
            this.setState({
                alert: "Invalid email or password. Please try again",
                isOpen: true
            });
            // console.log(error);
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Form className="login-form mt-3" onSubmit = {this.login}>
                <h1 className="text-center" >Flight School</h1>
                <h2 className="text-center" >Log In</h2>

                <div className="mt-4">
                <Alert color="danger" isOpen={this.state.isOpen}>
                    {this.state.alert}
                </Alert>
                </div>

                <FormGroup className="mt-4">
                    <Label>Email</Label>
                    <Input name="email" type="email" placeholder="Email" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input name="password" type="password" placeholder="password" onChange={this.handleChange}/>
                </FormGroup>

                <Button className="btn-lrg btn-dark btn-block mt-4" onClick = {this.login}>Log In</Button>

                <div className="text-center mt-3">
                    <a href="/signup">Sign Up</a>
                </div>
            </Form>
        )
    }
}

export default SignIn