import React, { Component } from 'react';
import { Jumbotron, Button, Navbar, NavbarBrand } from 'reactstrap';
import Bargraph from '../components/bargraph';
import Kcollapse from '../components/collapse';
import Example from '../components/dropdown';
import LineChart from '../components/linechart';
import './screen.css';



class Student extends Component {


    constructor(props) {
        super(props);
        this.state = {
           
            comments: {
                TeacherRemark: 'you are imporving , keep it up !!',
                MentorRemark: ' your grades are currently up to the mark :) ',
                ServerMarksEvluation: null
            }
        }
    }


    render() {



        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">
                            <h1> Student Evluation:</h1>
                        </NavbarBrand>
                    </div>
                </Navbar>

                <Jumbotron>

                    <div className="row">
                        <div className='col auto'>
                        <Kcollapse />

                        <div id="bargraph">
                                    <LineChart />
                                </div>

                        </div>


                        <div className='col auto'>
                            
                            <Example alt="for drop menu" />


                            <div >
                                <div id="bargraph">
                                    <Bargraph />
                                </div>
                                <hr/>
                                <div  id="bargraph">
                                    <h4>comments :</h4>
                                    <p>
                                        <ol>
                                            <li>Teacher remark : {this.state.TeacherRemark}</li>
                                            <hr />
                                            <li>Mentor remark : {this.state.MentorRemark}</li>
                                            <hr />
                                            <li>app evaluation : {this.state.ServerMarksEvluation}</li>
                                            <hr />
                                        </ol>
                                    </p>

                                </div>
                            </div>


                        </div>

                    </div>
                </Jumbotron>

                <div>


                </div>
                
                <Button color="danger" size="lg" >Back To Login Page</Button><br /><br />

            </div>


        );

    }
}

export default Student;

