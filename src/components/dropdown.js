import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Example = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret>
         {props.name} 
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem >Weekly</DropdownItem>
        <DropdownItem>Monthly</DropdownItem>
        <DropdownItem >Yearly</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;