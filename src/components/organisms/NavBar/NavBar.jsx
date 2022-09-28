
import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarText,
} from 'reactstrap';
import { UserPerfil } from '../../molecules/UserPerfil/UserPerfil';
import './navbar.css'
export const NavBar = ({text}) => {
    return (
      <div>
        <Navbar>
          <NavbarBrand className='brand'>GLWINBA</NavbarBrand>
          <NavbarText className='brand-text'>{text}</NavbarText>
          <NavbarText><UserPerfil /></NavbarText>         
        </Navbar>
      </div>
    );
}
