import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Alert, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AddSub = (props) => {
 
    const [isOpen3, setIsOpen3] = useState(false);



    const toggle3 = () => setIsOpen3(!isOpen3);

    
    return(
        

        <div className="container2">
        <Button size="lg" color="danger" onClick={toggle3} style={{ marginBottom: '1rem' }}>Add Subject</Button>
        <Collapse isOpen={isOpen3}>
            <Card>
                <CardBody>
                    <FormGroup>
                        <Label for="text">Subject Name</Label>
                        <Input type="text" name="text" id="text" placeholder="ex : Hindi , English" />
                    </FormGroup><hr />
                    <Button size="" color="success" style={{ marginBottom: '1rem' , padding: '2px 50px 2px 50px' }}>Add</Button>

                </CardBody>
            </Card>
        </Collapse>
    </div>

    )
}

export default AddSub;

