import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import './screen.css';
import { browserHistory } from 'react-router';
import AddT from './Admin_components/AddTeacher';
import AddS from './Admin_components/AddStudent';
import AddSub from './Admin_components/AddSubject';


class Admin extends Component {
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
                            <h1>Admin only</h1>
                        </NavbarBrand>
                    </div>
                </Navbar>
            </div>
            <div className="row">
                <div className="col sm-12 md-4 ls-4"> <AddT/> </div>
                <div className="col sm-12 md-4 ls-4"> <AddS/> </div>
                <div className="col sm-12 md-4 ls-4"> <AddSub/> </div>

                </div>
                <hr></hr><br></br>
                <Button size="lg" color="success" >Back to main screen</Button>

            </div>
        )
    }
}


export default Admin;




























// class Login extends Component  {

//     constructor(props){
//       super(props);
//       this.state = {

//       }
//     }

//     NavigatetoStudent(){
//       browserHistory.push("/")
//     }
//     render() {
//       return (
//         <div className="App">
//           <Navbar dark color="primary">
//             <div className="container">
//               <NavbarBrand href="/">
//                 <h1>Signup options</h1>
//                 </NavbarBrand>
//             </div>
//           </Navbar>
//           <div className="container2">
//           <Button color="danger" size="lg" >Student Login</Button><br/><br/>
//           <Button color="danger" size="lg">Teacher Login</Button><br/><br/>
//           <Button color="danger" size="lg">Admin only</Button><br/><br/>
//           </div>
//         </div>
//       );

//     }
//   }

//   export default Login;

