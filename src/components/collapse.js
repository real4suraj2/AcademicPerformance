import React from 'react';
import { CardBody, Card } from 'reactstrap';

const Kcollapse = ({ data }) => {
  return (
    <div>
      <h3>Student Info</h3>
      <br></br>
      <br></br>
      <Card>
        <CardBody>
          <div className="logo align-self-center"></div>
          <br />
          <ul className="list-group">
            <li className="list-group-item"> Student Id:  {data.studentId}<br /></li>
            <li className="list-group-item"> First Name:  {localStorage.getItem('firstName')}<br /></li>
            <li className="list-group-item"> Last Name:  {localStorage.getItem('lastName')}<br /></li>
            <li className="list-group-item"> Year:  {data.year}<br /></li>
            <li className="list-group-item"> DOB:  {new Date(data.dob).toString().substr(0, 15)}<br /></li>
            <li className="list-group-item"> Address:  {data.address}<br /></li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

export default Kcollapse;