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


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown, faChevronUp);

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      sideBarDisplay: [
        { title: 'managment', Display: false, char: <FontAwesomeIcon icon={faChevronDown}/> },
        { title: 'scoping', Display: false, char: <FontAwesomeIcon icon={faChevronDown}/> },
        { title: 'pricing', Display: false, char: <FontAwesomeIcon icon={faChevronDown}/> },
        { title: 'general', Display: false, char: <FontAwesomeIcon icon={faChevronDown}/> }
      ], select:[  { title: 'select', Display: false, char: <FontAwesomeIcon icon={faChevronDown}/> }]
    };
  }



  changeStatus = (key, arr) => {

    var newState = arr.slice();
    newState.map((elm => {
      if (key === elm.title) {
        if (elm.Display) {
          elm.Display = false;
          elm.char = <FontAwesomeIcon icon={faChevronDown}/>
        }
        else {
          elm.Display = !elm.Display
          elm.char = <FontAwesomeIcon icon={faChevronUp}/>;
        }
      } else {
        elm.Display = false;
        elm.char = <FontAwesomeIcon icon={faChevronDown}/>;
      }
    }))
    this.setState({ [arr]: newState })
  }

 

  render() {
    return (
      <div className='sideBar'>
        <div className='py-2 sidBarItem'>
            <div onClick={() => { this.changeStatus('managment', this.state.sideBarDisplay) }}>Managment Tools {this.state.sideBarDisplay[0].char}
            </div>
          {this.state.sideBarDisplay[0].Display ? <div className='links' >
            <Link className='link' to={pageLinkes.selectProject} >Select project</Link>
            <Link className='link' to={pageLinkes.newVersion} >New version</Link>
            <Link className='link' to={pageLinkes.allVersions}>All versions</Link>
            <Link className='link' to={pageLinkes.pdfPreview}>PDF preview</Link>
          </div> : null}
        </div>

        <div className='py-2 sidBarItem'>
          <div onClick={() => { this.changeStatus('scoping', this.state.sideBarDisplay) }}>Scoping {this.state.sideBarDisplay[1].char}</div>
          {this.state.sideBarDisplay[1].Display ? <div className='links' >
            <Link className='link' to={pageLinkes.projectDescreption} >Project Discraption</Link>
            <Link className='link' to={pageLinkes.actors}>Actors</Link>
            <Link className='link' to={pageLinkes.subjects}>Requirement Specifications‏</Link>
            <Link className='link' to={pageLinkes.userStory}>User Story</Link>
          </div> : null}
        </div>

        <div className='py-2 sidBarItem'>
          <div onClick={() => { this.changeStatus('pricing', this.state.sideBarDisplay) }}>Pricing {this.state.sideBarDisplay[2].char}</div>
          {this.state.sideBarDisplay[2].Display ? <div className='links' >
            <Link className='link' to={pageLinkes.pricing}>pricing</Link>
          </div> : null}
        </div>

        <div className='py-2 sidBarItem'>
          <div onClick={() => { this.changeStatus('general', this.state.sideBarDisplay) }}>General Information {this.state.sideBarDisplay[3].char}</div>
          {this.state.sideBarDisplay[3].Display ? <div className='links' >
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
        <div className=''>
            <div className='header'>
                <header className={'container py-2'}>SCOPER</header>
            </div>
                <div className={'container'}>
                    <Row >

                    <Col className={"col-3"}><NavBar /></Col>
                    <Col className=' col-9 articleRight border-dark border-left text-xl-center'><MainScreen /></Col>
                    </Row>

                </div>
            <div className='footer'>
                <footer className={'container py-3'}>✎ created by COD Team ©</footer>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}


export default connect(store => store)(App);

