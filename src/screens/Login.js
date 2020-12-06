import React, { Component } from 'react';
import { FormGroup, Label, Input, Navbar, NavbarBrand, Button, Alert } from 'reactstrap';
import './screen.css';
import axios from 'axios';

class InputScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            visible: false,
            message: ''
        }
    }

    handleLogin() {
        const { username, password } = this.state;
        axios.post('http://localhost:8080/api/users/login', {
            username, password
        }).then(response => {
            const { kind, token, username, firstName, lastName } = response.data;
            if (token == null || token == undefined) {
                console.log("Login Failed")
                this.setState({
                    visible: true,
                    message: 'Check your credentials!'
                })
            }
            localStorage.setItem("token", token);
            localStorage.setItem("kind", kind);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("username", username);
            if (kind == 'student')
                this.props.history.push("/dashboard");
            if (kind == 'teacher')
                this.props.history.push("/teacher");
            if (kind == 'admin')
                this.props.history.push("/admin");
        }).catch(err => {
            console.log("Login Failed")
            this.setState({
                visible: true,
                message: 'Check your credentials!'
            })
        })
    }

    render() {
        return (
            <div className="h-100">
                <div>
                    <Navbar dark color="primary">
                        <div className="container">
                            <NavbarBrand href="/">
                                <h1>Login</h1>
                            </NavbarBrand>
                        </div>
                    </Navbar>
                </div>
                <Alert isOpen={this.state.visible} color="danger" toggle={() => this.setState({visible: false})}>{this.state.message}</Alert>
                <div className="row justify-content-center align-items-center h-100" style={{ flex: 0.8 }}>
                    <div id="homescreen" className="col-auto" style={{ minWidth: 350 }}>
                        <FormGroup>
                            <Label for="examplePassword">Username</Label>
                            <Input type="text"
                                name="text"
                                id="examplePassword"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="****"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </FormGroup>
                        <Button
                            color="danger"
                            size="md"
                            onClick={this.handleLogin.bind(this)}
                            style={{
                                minWidth: 50
                            }}
                        >
                            Login
                        </Button><br /><br />
                    </div>
                </div>

            </div>
        );
    }
}

export default InputScreen;