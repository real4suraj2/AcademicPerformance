import React, { Component } from 'react';
import { Navbar, NavbarBrand, Alert, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';


class TeacherScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            subjects: [],
            studentId: '',
            year: '',
            title1: 'Weekly',
            title2: '',
            subjectId: '',
            marksObtained: 0,
            maximumMarks: 0,
            comment: '',
            reportId: null,
            visible: true,
            visible2: false,
            visible3: false
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8080/api/users/info/teacher', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                this.setState({ data: response.data.payload })
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(() => {
                axios.get('http://localhost:8080/api/users/info/teacher-subject', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        this.setState({ subjects: response.data.payload })
                        if (response.data.payload.length > 0)
                            this.setState({ subjectId: response.data.payload[0] })
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            })
    }

    handleData() {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:8080/api/reports/create', JSON.stringify({
            studentId: this.state.studentId.toString(),
            subjectId: this.state.subjectId.toString(),
            year: this.state.year.toString(),
            title: this.state.title1 + " " + this.state.title2,
            obtainedMarks: this.state.marksObtained.toString(),
            maximumMarks: this.state.maximumMarks.toString()
        }), {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
            if(response.data.payload != null && response.data.payload != undefined)
                this.setState({ reportId: response.data.payload, visible2: true });
            else{
                this.setState({ visible3: true });
            }
        })
            .catch(err => this.setState({ visible3: true }))
            .then(() => {
                if (this.state.reportId == null || this.state.reportId == undefined) {
                    this.setState({ visible3: true });
                    return;
                }
                if(this.state.comment.length == 0) return;
                axios.post('http://localhost:8080/api/comments/create', JSON.stringify({
                    reportId: this.state.reportId.toString(),
                    description: this.state.comment.toString()
                }), {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                }).then(response => { console.log(response); })
                    .catch(err => this.setState({ visible3: true }))
            });
    }

    render() {

        return (
            <div>
                <div className="App">
                    <Navbar dark color="primary">
                        <div className="container">
                            <NavbarBrand href="/">
                                <h1>Teacher Dashboard</h1>
                            </NavbarBrand>
                        </div>
                    </Navbar>
                </div>
                <Alert isOpen={this.state.visible} color="success" toggle={() => this.setState({ visible: false })}>Logged In Successfuly as {localStorage.getItem('username')}</Alert>
                <Alert isOpen={this.state.visible2} color="success" toggle={() => this.setState({ visible2: false })}>Report Generation Successful</Alert>
                <Alert isOpen={this.state.visible3} color="danger" toggle={() => this.setState({ visible3: false })}>Please check the form details!</Alert>
                <div className="container">
                    <div className="row">
                        <div className="col ls-6">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-auto">
                                    <br></br>
                                    <br></br>
                                    <h4>YOUR INFORMATION</h4>
                                    <br /><br />
                                    <div className="logo-teacher align-self-center"></div>
                                    <ul id="teac" class="list-group">
                                        <li class="list-group-item"> User id  :  {this.state.data.userId}<br /></li>
                                        <li class="list-group-item"> Teacher id  :  {this.state.data.teacherId}<br /></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col ls-6">
                            <br /><br />
                            <div>
                                <FormGroup>
                                    <Label>{'Student ID & YEAR'}</Label>
                                    <div className="row">
                                        <div className="col ls-6 md-6 sm-6">
                                            <Input
                                                type="text"
                                                placeholder="Unique Student Id"
                                                value={this.state.studentId}
                                                onChange={event => this.setState({ studentId: event.target.value })}
                                            />
                                        </div>
                                        <div className="col ls-6 md-6 sm-6">
                                            <Input
                                                type="text"
                                                placeholder="Year"
                                                value={this.state.year}
                                                onChange={event => this.setState({ year: event.target.value })}
                                            />
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <div className="row">
                                        <div className="col ls-6 md-6 sm-6">
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name="text"
                                                    id="text"
                                                    placeholder="Report Title"
                                                    value={this.state.title2}
                                                    onChange={event => this.setState({ title2: event.target.value })}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="col ls-6 md-6 sm-6">
                                            <FormGroup>
                                                <Input
                                                    type="select"
                                                    name="select"
                                                    id="exampleSelect"
                                                    value={this.state.title1}
                                                    onChange={event => this.setState({ title1: event.target.value })}
                                                >
                                                    <option value="Weekly">Weekly</option>
                                                    <option value="Monthly">Monthly</option>
                                                    <option value="Yearly">Yearly</option>
                                                </Input>
                                            </FormGroup>
                                        </div>

                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Select Subject ID</Label>
                                    <Input
                                        type="select" name="select" id="exampleSelect"
                                        value={this.state.subjectId}
                                        onChange={event => this.setState({ subjectId: event.target.value })}
                                    >
                                        {
                                            this.state.subjects.length && this.state.subjects.map(subjectId => <option value={subjectId}>{subjectId}</option>)
                                        }
                                    </Input>
                                </FormGroup>

                                <Label for="examplePassword">Marks Details</Label>
                                <br />
                                <div className="row">

                                    <div className="col ls-6 md-6 sm-6">
                                        <FormGroup>
                                            <Input type="text" name="text" id="text" placeholder="Marks obtained"
                                                value={this.state.marksObtained}
                                                onChange={event => this.setState({ marksObtained: event.target.value })}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="col ls-6 md-6 sm-6">
                                        <FormGroup>
                                            <Input type="text" name="text" id="text" placeholder="Max Marks"
                                                value={this.state.maximumMarks}
                                                onChange={event => this.setState({ maximumMarks: event.target.value })}
                                            />
                                        </FormGroup>
                                    </div>

                                </div>
                                <FormGroup>
                                    <Label for="exampleText">Remarks And Comments</Label>
                                    <Input type="textarea" name="text" id="exampleText" placeholder="Optional"
                                        value={this.state.comment}
                                        onChange={event => this.setState({ comment: event.target.value })}
                                    />
                                </FormGroup>
                                <hr />
                                <Button color="success" onClick={() => this.handleData()}
                                >Add Record To Database</Button><br /><br />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default TeacherScreen;