import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Alert, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const AddS = (props) => {
    const [isOpen2, setIsOpen2] = useState(false);


    const toggle2 = () => setIsOpen2(!isOpen2);


   return( 
    <div className="container2">
    <Button size="lg" color="secondary" onClick={toggle2} style={{ marginBottom: '1rem' }}>Add Student</Button>
    <Collapse isOpen={isOpen2}>
        <Card>
            <CardBody>
                <FormGroup>
                    <Label for="text">User ID</Label>
                    <Input type="text" name="text" id="text" placeholder="ex : 0103cs181170" />
                </FormGroup><hr />
                
                <FormGroup>
                    <Label for="text">First Name</Label>
                    <Input type="text" name="text" id="text" placeholder="ex : surya" />
                </FormGroup><hr />
                
                <FormGroup>
                    <Label for="text">Last Name</Label>
                    <Input type="text" name="text" id="text" placeholder="ex : patel" />
                </FormGroup><hr />
                
                <FormGroup>
                    <Label for="text">Kind</Label>
                    <Input type="text" name="text" id="text" placeholder="ex : ..." />
                </FormGroup><hr />
                
                <FormGroup>
                    <Label for="text">User Name</Label>
                    <Input type="text" name="text" id="text" placeholder="ex : patelsurya71" />
                </FormGroup><hr />
                <Button size="" color="success" style={{ marginBottom: '1rem' , padding: '2px 50px 2px 50px' }}>Add</Button>

            </CardBody>
        </Card>
    </Collapse>
</div>
   )

   }

   export default AddS;