import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Alert, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

const AddSub = (props) => {
    const [sub, setSub] = useState('');
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    return (
        <div className="container2">
            <h3>ADD SUBJECT</h3>
            <br></br>
            <br></br>
            <Card>
                <CardBody>
                    <FormGroup>
                        <Label for="text">Subject Name</Label>
                        <Input type="text" name="text" id="text" placeholder="" value={sub} onChange={event => setSub(event.target.value)} />
                    </FormGroup><hr />
                    <Button size="" color="success" style={{ marginBottom: '1rem', padding: '2px 50px 2px 50px' }} onClick={() => {
                        console.log(sub);
                        const token = localStorage.getItem('token');
                        axios.post('http://localhost:8080/api/subjects/add', JSON.stringify({
                            name: sub.toString()
                        }), {
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {
                            console.log(response);
                            if (response.data.message == "subject added") setVisible(true);
                            else setVisible2(true);
                        })
                            .catch(err => console.log(err))

                    }}>Add</Button>
                    <Alert isOpen={visible} color="success" toggle={() => setVisible(false)}>Subject generated Successfully</Alert>
                    <Alert isOpen={visible2} color="danger" toggle={() => setVisible2(false)}>Please check form details</Alert>
                </CardBody>
            </Card>
        </div>

    )
}

export default AddSub;

