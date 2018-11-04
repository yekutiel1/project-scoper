import React, { Component } from 'react';
import { pageLinkes } from '../linkes';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';
  
  export default class AppNavbar extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isOpen: false
      };
    }
    toggle = ()=> {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar  dark expand="sm" className="topnav">
              <Container>
            {/* <NavbarBrand href="/">scoper</NavbarBrand> */}
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href={pageLinkes.mangementTools}>Managment Tools</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href={pageLinkes.projectDescreption}>Add Project Discraption</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href={pageLinkes.actors}>Add Actors</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href={pageLinkes.userStory}>Add User Story</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href={pageLinkes.drow_io}>Attach diagram</NavLink>
                </NavItem>
                  </Nav>
            </Collapse>
              </Container>
          </Navbar>
        </div>
      );
    }
  } 
 