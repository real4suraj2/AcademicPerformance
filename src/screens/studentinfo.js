import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Bargraph from '../components/bargraph';
import Kcollapse from '../components/collapse';
import Example from '../components/dropdown';
import './screen.css';



class Student extends Component {


    constructor(props) {
        super(props);
        this.state = {
            info: {
                user_id: '0103cs181169',
                first_name: 'suraj',
                last_name: 'patel',
                username: 'real4suraj2',
                password: '****'
            },
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
                <Jumbotron>
                    <h2> Student Evluation:</h2><br />
                    <br /><br />
                    <div className="row">
                        <div className='col ls-4'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png" alt="student_image" />
                        </div>

                        <div className='col ls-4'>


                            <ul >
                                <li> User id  :  {this.state.info.user_id}<br /></li>
                                <li> First name  :  {this.state.info.first_name}<br /></li>
                                <li> Last name  :  {this.state.info.last_name}<br /></li>
                                <li> Username  :  {this.state.info.username}<br /></li>
                                <li> Current Password  :  {this.state.info.password}<br /></li>
                            </ul>

                        </div>

                    </div>
                </Jumbotron>

                <div>
                    <Example alt="for drop menu" />

                    <div className="row">
                        <div className="col ls-6 sm-12 md-12" id="bargraph">
                            <Bargraph />
                        </div>
                        <div className="col ls-6 sm-12 md-12" id="bargraph">
                            <h4>comments :</h4>
                            <p>
                                <ol>
                                    <li>Teacher remark : {this.state.TeacherRemark}</li>
                                    <hr/>
                                    <li>Mentor remark : {this.state.MentorRemark}</li>
                                    <hr/>
                                    <li>app evaluation : {this.state.ServerMarksEvluation}</li>
                                    <hr/>                               
                                </ol>
                            </p>

                        </div>
                    </div>
                </div>
                <Kcollapse />
                <Button color="danger" size="lg" >Back To Login Page</Button><br/><br/>

            </div>


        );

    }
}

export default Student;

