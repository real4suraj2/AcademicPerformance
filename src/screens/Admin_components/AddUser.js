import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Alert, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';


const AddS = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [kind, setKind] = useState('teacher');
    const [username, setUsername] = useState('');
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [year, setYear] = useState('');
    return (
        <div className="container2">
            <h3>ADD USER</h3>
            <br></br>
            <br></br>
            <Card>
                <CardBody>
                    <FormGroup>
                        <Label for="text">First Name</Label>
                        <Input type="text" name="text" id="text" placeholder="ex : surya" value={firstName} onChange={event => setFirstName(event.target.value)} />
                    </FormGroup><hr />

                    <FormGroup>
                        <Label for="text">Last Name</Label>
                        <Input type="text" name="text" id="text" placeholder="ex : patel" value={lastName} onChange={event => setLastName(event.target.value)} />
                    </FormGroup><hr />

                    <FormGroup>
                        <Label for="select">Kind</Label>
                        <Input type="select" name="select" id="exampleSelect" value={kind} onChange={event => setKind(event.target.value)}>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </Input>
                    </FormGroup>
                    {
                        kind == 'student' &&
                        <FormGroup>
                            <Label for="text">Address</Label>
                            <Input type="text" name="text" id="text" placeholder="ex: Location x" value={address} onChange={event => setAddress(event.target.value)} />
                        </FormGroup>
                    }
                    {
                        kind == 'student' &&
                        <FormGroup>
                            <Label for="text">DOB</Label>
                            <Input type="text" name="text" id="text" placeholder="YYYY-MM-DD" value={dob} onChange={event => setDob(event.target.value)} />
                        </FormGroup>
                    }
                    {
                        kind == 'student' &&
                        <FormGroup>
                            <Label for="text">Year</Label>
                            <Input type="text" name="text" id="text" placeholder="Student Year" value={year} onChange={event => setYear(event.target.value)} />
                        </FormGroup>
                    }
                    <FormGroup>
                        <Label for="text">User Name</Label>
                        <Input type="text" name="text" id="text" placeholder="ex : patelsurya71" value={username} onChange={event => setUsername(event.target.value)} />
                    </FormGroup><hr />
                    <Button size="" color="success" style={{ marginBottom: '1rem', padding: '2px 50px 2px 50px' }} onClick={() => {
                        const token = localStorage.getItem('token');
                        let data = {
                            firstName, lastName, kind, username, password: 'test123'
                        }
                        if(kind == 'student'){
                            data = {...data, address, dob, year };
                        }
                        axios.post('http://localhost:8080/api/users/create', JSON.stringify(
                            data
                        ), {
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {
                            console.log(response);
                            if (response.data.token != null && response.data.token != undefined) setVisible(true);
                            else setVisible2(true);
                        })
                            .catch(err => console.log(err))
                    }}>Add</Button>
                    <Alert isOpen={visible} color="success" toggle={() => setVisible(false)}>User generation Successful</Alert>
                    <Alert isOpen={visible2} color="danger" toggle={() => setVisible2(false)}>Please check form details</Alert>
                </CardBody>
            </Card>
        </div>
    )

}

export default AddS;