
import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarText,
} from 'reactstrap';
import { UserPerfil } from '../../molecules/UserPerfil/UserPerfil';

export const NavBar = ({text}) => {
    return (
      <div>
        <Navbar>
          <NavbarBrand>GLWINBA</NavbarBrand>
          <NavbarText><h1>{text}</h1></NavbarText>
          <NavbarText><UserPerfil /></NavbarText>
            
            {/* <NavbarText>{user}</NavbarText>
            <NavbarText>{email}</NavbarText> */}
          
        </Navbar>
      </div>
    );
}
