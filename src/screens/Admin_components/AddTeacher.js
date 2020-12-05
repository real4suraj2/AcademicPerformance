import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Alert, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AddT = (props) => {
    const [isOpen1, setIsOpen1] = useState(false);


    const toggle1 = () => setIsOpen1(!isOpen1);

    

    return (
        <div className="container2">
            
                <Button size="lg" color="danger" onClick={toggle1} style={{ marginBottom: '1rem' }}>Add Teacher</Button>
                <Collapse isOpen={isOpen1}>
                    <Card>
                        <CardBody>
                            <FormGroup>
                                <Label for="text">Teacher ID</Label>
                                <Input type="text" name="text" id="text" placeholder="ex : 0103cs181170" />
                            </FormGroup><hr />
                            <FormGroup>
                                <Label for="text">User ID</Label>
                                <Input type="text" name="text" id="text" placeholder="ex : 0103cs181170" />
                            </FormGroup><hr />
                            <div className="row">
                                <div className="col sm-12 ls-6 md-6">
                            <FormGroup>
                                <Label for="text">First Name</Label>
                                <Input type="text" name="text" id="text" placeholder="ex : surya" />
                            </FormGroup><hr />
                            </div>
                            <div className="col sm-12 ls-6 md-6">
                            <FormGroup>
                                <Label for="text">Last Name</Label>
                                <Input type="text" name="text" id="text" placeholder="ex : patel" />
                            </FormGroup><hr />
                            </div>
                            </div>
                            <Button size="" color="success" style={{ marginBottom: '1rem' , padding: '2px 50px 2px 50px' }}>Add</Button>

                        </CardBody>
                    </Card>
                </Collapse>
            
        </div>
           
    );
}

export default AddT;