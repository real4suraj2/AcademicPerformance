import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const Kcollapse = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button size="lg" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Show More</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
         INSERT MORE DETAILS HERE
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default Kcollapse;