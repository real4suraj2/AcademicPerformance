import React, { Component } from 'react';
import Kform from '../components/form';
import { Button, Navbar, NavbarBrand, } from 'reactstrap';


class TeacherScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: {
                user_id: '0103cs181170',
                first_name: 'suryu',
                last_name: 'patel',
                username: 'real4suraj2',
                password: '****'
            }
        }
    }

    render() {

        return (
            <div>
                <div className="App">
                    <Navbar dark color="primary">
                        <div className="container">
                            <NavbarBrand href="/">
                                <h1>Welcome {this.state.info.first_name}  {this.state.info.last_name}</h1>
                            </NavbarBrand>
                        </div>
                    </Navbar>
                </div>
                <div className="row">

                    <div className="col ls-6">
                        <br />
                        <br />
                        <h4>YOUR INFORMATION</h4>
                        <br /><br />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png" alt="student_image" />

                        <br /><br />

                        <ul id="teac">
                            <li> User id  :  {this.state.info.user_id}<br /></li>
                            <li> First name  :  {this.state.info.first_name}<br /></li>
                            <li> Last name  :  {this.state.info.last_name}<br /></li>
                            <li> Username  :  {this.state.info.username}<br /></li>
                            <li> Current Password  :  {this.state.info.password}<br /></li>
                        </ul>
                        <br />
                        <Button color="danger" size="lg" >Back To Login</Button><br /><br />

                    </div>
                    <div className="col ls-6">
                        <br /><br />
                        <p><Kform /></p>
                    </div>
                </div>
            </div>
        );
    }


}

export default TeacherScreen;