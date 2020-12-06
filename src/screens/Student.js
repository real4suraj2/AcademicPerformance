import React, { Component } from 'react';
import { Alert, Input, FormGroup, Navbar, NavbarBrand, Card } from 'reactstrap';
import Kcollapse from '../components/collapse';
import Example from '../components/dropdown';
import LineChart from '../components/linechart';
import './screen.css';
import axios from 'axios';



class Student extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: {},
            reports: [],
            display: [],
            comments: {},
            criteria: 'All',
            visible: true
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8080/api/users/info/student', {
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
            }).then(() => {
                axios.get('http://localhost:8080/api/reports/student/' + this.state.data.studentId, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        this.setState({ reports: response.data.payload });
                        this.setState({ display: response.data.payload });
                    }).catch(err => console.log(err));
            }).then(() => {
                axios.get('http://localhost:8080/api/comments/' + this.state.data.studentId, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        this.setState({ comments: response.data.payload });
                    }).catch(err => console.log(err));
            });
    }


    render() {
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">
                            <h1>Student Evaluation</h1>
                        </NavbarBrand>
                    </div>
                </Navbar>
                <Alert isOpen={this.state.visible} color="success" toggle={() => this.setState({visible: false})}>Logged In Successfuly as {localStorage.getItem('username')}</Alert>
                <br></br>
                <br></br>
                <div className="container">
                    <Card className="p-4">
                        <div className="row">
                            <div className='col-4'>
                                <Kcollapse data={this.state.data} />
                            </div>
                            <div className='col-8'>
                                <div className='col auto'>
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col auto">
                                            <p>Evaluation Criteria</p>
                                        </div>
                                        <div className="col auto">
                                            <FormGroup>
                                                <Input
                                                    type="select"
                                                    name="select"
                                                    id="exampleSelect"
                                                    value={this.state.criteria}
                                                    onChange={event => {
                                                        this.setState({ criteria: event.target.value });
                                                        // console.log(this.state.reports);
                                                        const newReportData = this.state.reports.filter(report => event.target.value == 'All' || event.target.value == report.title.split(" ")[0]);
                                                        // console.log(newReportData);
                                                        this.setState({display: newReportData})
                                                    }}
                                                >
                                                    <option value="All">All</option>
                                                    <option value="Weekly">Weekly</option>
                                                    <option value="Monthly">Monthly</option>
                                                    <option value="Yearly">Yearly</option>
                                                </Input>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div id="bargraph">
                                        {this.state.reports.length && this.state.display.length && <LineChart data={this.state.display} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <br></br>
                    <Card className="p-4">
                        <p className="h2">REMARKS</p>
                        <div className="row">
                            <div className="col sm-12 md-8 lg-8">
                                <ul className="list-group">
                                    {
                                        this.state.comments.length && this.state.comments.map(comment =>
                                            <li className="list-group-item bg-dark">
                                                <div>
                                                    <p className="text-white">ReportID: {comment.reportId}</p>
                                                    <p className="text-white">Remarks: {comment.description}</p>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </Card>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            </div>


        );

    }
}

export default Student;

