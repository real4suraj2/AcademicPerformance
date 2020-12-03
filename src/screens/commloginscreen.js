import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Navbar, NavbarBrand, Button } from 'reactstrap';
import './screen.css';


class InputScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <div>
                <div className="App">
                    <Navbar dark color="primary">
                        <div className="container">
                            <NavbarBrand href="/">
                                <h1>Login For Students And Teachers</h1>
                            </NavbarBrand>
                        </div>
                    </Navbar>
                </div>
                <div className="row">
                    <div className="col sm-0 ls-1 md-2"><br></br></div>
                    <div id="homescreen" className="col ls-6 md-8 sm-12">
                        <br /><br /><br />
                        <br />
                        <FormGroup>
                            <Label for="examplePassword">Student/Teacher ID</Label>
                            <Input type="text" name="text" id="examplePassword" placeholder="ex : 0103cs181170" />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="****" />
                        </FormGroup>
                        <Button color="danger" size="lg" >Login</Button><br /><br />

                    </div>
                    <div className="col sm-0 ls-1 md-2"><br></br></div>
                </div>

            </div>
        );
    }
}

export default InputScreen;