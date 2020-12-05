import React, { Component } from 'react';
import {Alert, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Kform extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teachername: 'baghwan'
        }
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Student ID</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="ex : 0103cs181170" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Title</Label>
                    <div className="row">
               
               <div className="col ls-6 md-6 sm-6">
                   <FormGroup>
                       
                       <Input type="text" name="text" id="text" placeholder="Add Name" />
                   </FormGroup>
               </div>
               <div className="col ls-6 md-6 sm-6">
                   <FormGroup>
                   <Input type="select" name="select" id="exampleSelect">
                        <option>Weekly</option>
                        <option>Mounthly</option>
                        <option>Yearly</option>
                       
                    </Input>
                   </FormGroup>
               </div>

           </div>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Select Subject ID</Label>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>sub-1</option>
                        <option>sub-2</option>
                        <option>sub-3</option>
                        <option>sub-4</option>
                        <option>sub-5</option>
                    </Input>
                </FormGroup>
                
               <Label for="examplePassword">Marks Details</Label>
                <br/>
                <div className="row">
               
                    <div className="col ls-6 md-6 sm-6">
                        <FormGroup>
                            
                            <Input type="text" name="text" id="text" placeholder="Marks obtained" />
                        </FormGroup>
                    </div>
                    <div className="col ls-6 md-6 sm-6">
                        <FormGroup>
                            
                            <Input type="text" name="text" id="text" placeholder="Max Marks" />
                        </FormGroup>
                    </div>

                </div>
                <FormGroup>
                    <Label for="exampleText">Remarks And Comments</Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <hr/>
                
                
                <FormGroup check>
                    <br />
                    <Label check>
                        <Input type="checkbox" required />{' '}
                  i agree that all info is done by teacher {this.state.teachername}
                    </Label>
                </FormGroup><br />
                <Button>Add Record To Database</Button><br/><br/>
                <p>use this alert after runtime success</p>
                <Alert color="success" >
        Record is added successfully!!
      </Alert>
            </Form>
        );
    }
}

export default Kform;