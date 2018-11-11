import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { pageLinkes } from './linkes'
import { Row, Col } from 'reactstrap'
import store from './store/store';
import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, } from 'reactstrap';

import SelectProject from './pages/managmentTools/selectProject.js';
import Versions from './pages/managmentTools/versions.js';
import PDFpreview from './pages/managmentTools/pdfPreview.js';
import CreateNewVersion from './pages/managmentTools/createNewVersion.js';

import ProjectDescription from './pages/scoping/projectDescription.js';
import Form from "./pages/scoping/Form.js";
import UserStories from './pages/scoping/AddUserStory.js';

import Assumptions from './pages/generalInformation/assumptions.js'
import Diagram from './pages/generalInformation/diagram.js'

import Pricing from './pages/pricing/pricing.js';


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDown: [
        { title: 'managment', isOpen: false},
        { title: 'scoping', isOpen: false},
        { title: 'pricing', isOpen: false},
        { title: 'general', isOpen: false}
      ]
    };
  }

 
/**
 * Change the status of drop-down unit 
* @param {Number} index 
*/
  dropDownIsOpen = (index) => {
    var newState = this.state.dropDown.slice();
    newState[index].isOpen = !newState[index].isOpen;
    this.setState({ dropDown: newState })
  }
  
   
/**
 * Changing the direction of the arrow if clicked 
* @param {Boolian} bool 
*/
    arrowIcon = (bool) => {
      return bool ? "⏷" : "⏵"
    }
  
  
  
  render() {
    return (
      <div className='sideBar'>
        <div className='sidBarItem'>

          <div onClick={() => { this.dropDownIsOpen(0) }}>{this.arrowIcon(this.state.dropDown[0].isOpen)} Managment Tools</div>
          {this.state.dropDown[0].isOpen ? <div className='links' >
            <Link className='link' to={pageLinkes.selectProject} >Select project</Link>
            <Link className='link' to={pageLinkes.newVersion} >New version</Link>
            <Link className='link' to={pageLinkes.allVersions}>All versions</Link>
            <Link className='link' to={pageLinkes.pdfPreview}>PDF preview</Link>
          </div> : null}
        </div>

        <div className='sidBarItem'>
          <div onClick={() => { this.dropDownIsOpen(1) }}>{this.arrowIcon(this.state.dropDown[1].isOpen)} Scoping</div>
          {this.state.dropDown[1].isOpen ? <div className='links' >
            <Link className='link' to={pageLinkes.projectDescreption} >Project Discraption</Link>
            <Link className='link' to={pageLinkes.actors}>Actors</Link>
            <Link className='link' to={pageLinkes.subjects}>Requirement Specifications‏</Link>
            <Link className='link' to={pageLinkes.userStory}>User Story</Link>
          </div> : null}
        </div>

        <div className='sidBarItem'>
          <div onClick={() => { this.dropDownIsOpen(2) }}>{this.arrowIcon(this.state.dropDown[2].isOpen)} Pricing</div>
          {this.state.dropDown[2].isOpen ? <div className='links' >
            <Link className='link' to={pageLinkes.pricing}>pricing</Link>
          </div> : null}
        </div>

        <div className='sidBarItem'>
          <div onClick={() => { this.dropDownIsOpen(3) }}>{this.arrowIcon(this.state.dropDown[3].isOpen)} General Information</div>
          {this.state.dropDown[3].isOpen ? <div className='links' >
            <Link className='link' to={pageLinkes.assumptions}>Assumptions</Link>
            <Link className='link' to={pageLinkes.diagram}>Attach diagram</Link>
          </div> : null}
        </div>

      </div>
    );
  }
}


class MainScreen extends Component {
  render() {
    return (
      <div className='mainScreen'>

        <Route exact path={pageLinkes.selectProject} component={SelectProject} />
        <Route exact path={pageLinkes.newVersion} component={CreateNewVersion} />
        <Route path={pageLinkes.allVersions} component={Versions} />
        <Route path={pageLinkes.pdfPreview} component={PDFpreview} />

        <Route path={pageLinkes.projectDescreption} component={ProjectDescription} />
        <Route path={pageLinkes.actors} component={() => <Form name={'Actor'} dispatchType={'ACTOR'} enableDelete={true} />} />
        <Route path={pageLinkes.subjects} component={() => <Form name={'Subject'} dispatchType={'SUBJECT'} enableDelete={false} />} />
        <Route path={pageLinkes.userStory} component={UserStories} />
        <Route path={pageLinkes.assumptions} component={Assumptions} />
        <Route path={pageLinkes.diagram} component={Diagram} />
        <Route path={pageLinkes.pricing} component={Pricing} />

      </div>
    );
  }
}


class App extends Component {

  componentWillMount() {
    store.dispatch({ type: 'GET_PROJECTS' });
  }

  render() {
    return (
      <BrowserRouter >
        <div className='maincContainer'>
          <Row className='header'>SCOPER</Row>
          <Row >
            <Col sm="3" md='2' className='articleLeft'><NavBar /></Col>
            <Col sm="9" md='10' className='articleRight'><MainScreen /></Col>
          </Row>
          <Row className='footer'><footer>✎ created by COD Team ©</footer></Row>
        </div>
      </BrowserRouter>
    );
  }
}


export default connect(store => store)(App);

