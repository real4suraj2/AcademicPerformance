import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const Kcollapse = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const  info =  {
    user_id: '0103cs181169',
    first_name: 'suraj',
    last_name: 'patel',
    username: 'real4suraj2',
    password: '****'
};
  return (
    <div>
      <Button size="lg" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Student information</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png" alt="student_image" />
                            <br />
                            

                            <ul >
                                <li> User id  :  {info.user_id}<br /></li>
                                <li> First name  :  {info.first_name}<br /></li>
                                <li> Last name  :  {info.last_name}<br /></li>
                                <li> Username  :  {info.username}<br /></li>
                                <li> Current Password  :  {info.password}<br /></li>
                            </ul>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default Kcollapse;