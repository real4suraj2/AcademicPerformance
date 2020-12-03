import React, { Component } from 'react';
import { Navbar , NavbarBrand , Button } from 'reactstrap';
import './screen.css';



class Login extends Component  {

    constructor(props){
      super(props);
      this.state = {
      
      }
    }
  
    render() {
      return (
        <div className="App">
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">
                <h1>Signup options</h1>
                </NavbarBrand>
            </div>
          </Navbar>
          <div className="container2">
          <Button color="danger" size="lg" >Student Login</Button><br/><br/>
          <Button color="danger" size="lg">Teacher Login</Button><br/><br/>
          <Button color="danger" size="lg">Admin only</Button><br/><br/>
          </div>
        </div>
      );
  
    }
  }

  export default Login;

