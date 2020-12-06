import React, { useState } from 'react';
import axios from 'axios';
import { Collapse, Button, CardBody, Card, Alert, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AddT = (props) => {
    const [id1, setId1] = useState('');
    const [id2, setId2] = useState('');
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    return (
        <div className="container2">
            <h3>ASSIGN SUBJECT</h3>
            <br></br>
            <br></br>
            <Card>
                <CardBody>
                    <FormGroup>
                        <Label for="text">Teacher ID</Label>
                        <Input type="text" name="text" id="text" placeholder="ex : 0103cs181170" value={id1} onChange={event => setId1(event.target.value)} />
                    </FormGroup><hr />
                    <FormGroup>
                        <Label for="text">Subject ID</Label>
                        <Input type="text" name="text" id="text" placeholder="ex : 0103cs181170" value={id2} onChange={event => setId2(event.target.value)} />
                    </FormGroup><hr />
                    <Button size="" color="success" style={{ marginBottom: '1rem', padding: '2px 50px 2px 50px' }} onClick={() => {
                        const token = localStorage.getItem('token');
                        axios.post('http://localhost:8080/api/subjects/assign', JSON.stringify({
                            subjectId: id1,
                            teacherId: id2
                        }), {
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {
                            console.log(response);
                            if(response.data.message == "subject assigned") setVisible(true);
                            else setVisible2(true);
                        })
                            .catch(err => console.log(err))
                    }}>Add</Button>
                    <Alert isOpen={visible} color="success" toggle={() => setVisible(false)}>Subject Assigned to Teacher Successfully</Alert>
                    <Alert isOpen={visible2} color="danger" toggle={() => setVisible2(false)}>Please check form details</Alert>
                </CardBody>
            </Card>
        </div>

    );
}

export default AddT;