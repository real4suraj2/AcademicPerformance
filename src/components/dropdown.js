import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Example = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret>
        Evaluation Criteria 
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem >Yearly</DropdownItem>
        <DropdownItem>Mounthly</DropdownItem>
        
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;