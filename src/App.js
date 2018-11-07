import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { pageLinkes } from './linkes'
import { Row, Col } from 'reactstrap'
import store from './store/store';
import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, } from 'reactstrap';

import ManagmentTools from './pages/managmentTools.js';
import ProjectDescription from './pages/projectDescription.js';
import Form from "./pages/Form.js";
import UserStories from './pages/AddUserStory.js';
import Assumptions from './pages/assumptions.js'
import Diagram from './pages/diagram.js';
import Pricing from './pages/pricing.js';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      sideBarDisplay: [
        { title: 'managment', Display: false, char: '⏵' },
        { title: 'scoping', Display: false, char: '⏵' },
        { title: 'pricing', Display: false, char: '⏵' },
        { title: 'general', Display: false, char: '⏵' }
      ], select:[  { title: 'select', Display: false, char: '⏵' }]
    };
  }



  changeStatus = (key, arr) => {

    var newState = arr.slice();
    newState.map((elm => {
      if (key === elm.title) {
        if (elm.Display) {
          elm.Display = false;
          elm.char = '⏵'
        }
        else {
          elm.Display = !elm.Display
          elm.char = '⏷';
        }
      } else {
        elm.Display = false;
        elm.char = '⏵';
      }
    }))
    this.setState({ [arr]: newState })
  }

  arr = [
    {name: 'Managment Tools', arr: [{name: 'Managment Tools', link: pageLinkes.mangementTools}]},
    {name: 'Scoping', arr: [{name: 'Project Discraption', link: pageLinkes.projectDescreption},{name: 'Actors', link: pageLinkes.actors},{name: 'Requirement Specifications‏', link: pageLinkes.subjects}]},
    {name: 'Scoping', arr: [{name: 'Project Discraption', link: pageLinkes.projectDescreption}]},
  ]

  render() {
    return (
      <div className='sideBar'>
        <div className='sidBarItem'>
          <div onClick={() => { this.changeStatus('managment', this.state.sideBarDisplay) }}>{this.state.sideBarDisplay[0].char} Managment Tools</div>
          {this.state.sideBarDisplay[0].Display ? <div className='links' >
          <div onClick={() => { this.changeStatus('select', this.state.select) }}>{this.state.select[0].char} Select project</div>
            <Link className='link' to={pageLinkes.mangementTools} >Managment Tools</Link>
          {/* {this.state.select[0].Display ? <div className='links' > */}
          </div> : null}
        </div>

        <div className='sidBarItem'>
          <div onClick={() => { this.changeStatus('scoping', this.state.sideBarDisplay) }}>{this.state.sideBarDisplay[1].char} Scoping</div>
          {this.state.sideBarDisplay[1].Display ? <div className='links' >
            <Link className='link' to={pageLinkes.projectDescreption} >Project Discraption</Link>
            <Link className='link' to={pageLinkes.actors}>Actors</Link>
            <Link className='link' to={pageLinkes.subjects}>Requirement Specifications‏</Link>
            <Link className='link' to={pageLinkes.userStory}>User Story</Link>
          </div> : null}
        </div>

        <div className='sidBarItem'>
          <div onClick={() => { this.changeStatus('pricing', this.state.sideBarDisplay) }}>{this.state.sideBarDisplay[2].char} Pricing</div>
          {this.state.sideBarDisplay[2].Display ? <div className='links' >
            <Link className='link' to={pageLinkes.pricing}>pricing</Link>
          </div> : null}
        </div>

        <div className='sidBarItem'>
          <div onClick={() => { this.changeStatus('general', this.state.sideBarDisplay) }}>{this.state.sideBarDisplay[3].char} General Information</div>
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

        <Route exact path={pageLinkes.mangementTools} component={ManagmentTools} />
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

                    <Col sm="3" md='2'><NavBar /></Col>
                    <Col sm="9" md='10' className='articleRight border-dark border-left text-xl-center'><MainScreen /></Col>
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

