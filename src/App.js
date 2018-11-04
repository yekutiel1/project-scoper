import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { pageLinkes } from './linkes'
import {Row} from 'reactstrap'
import store from './store/store';

import ManagmentTools from './pages/managmentTools.js';
import ProjectDescription from './pages/projectDescription.js';
import Form from "./pages/Form.js";
import UserStories from './pages/AddUserStory.js';
import Assumptions from './pages/assumptions.js'
import Diagram from './pages/diagram.js';
import Pricing from './pages/pricing.js';

class NavBar extends Component {
  render() {
    return (
      <div className="navBar">
        <Link to={pageLinkes.mangementTools} >Managment Tools</Link>
        <Link to={pageLinkes.projectDescreption} >Project Discraption</Link>
        <Link to={pageLinkes.actors}>Actors</Link>
        <Link to={pageLinkes.subjects}>Requirement Specifications‏</Link>
        <Link to={pageLinkes.userStory}>User Story</Link>
        <Link to={pageLinkes.assumptions}>Assumptions</Link>
        <Link to={pageLinkes.diagram}>Attach diagram</Link>
        <Link to={pageLinkes.pricing}>pricing</Link>
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
        <Route path={pageLinkes.actors} component={ () => <Form name={'Actor'} dispatchType={'ACTOR'} enableDelete={true}/>}/>
        <Route path={pageLinkes.subjects} component={() => <Form name={'Subject'} dispatchType={'SUBJECT'} enableDelete={false}/>}/>
        <Route path={pageLinkes.userStory} component={UserStories} />
        <Route path={pageLinkes.assumptions} component={Assumptions} />
        <Route path={pageLinkes.diagram} component={Diagram} />
        <Route path={pageLinkes.pricing} component={Pricing} />
      </div>
    );
  }
}


class App extends Component {

  componentWillMount(){
    store.dispatch({ type: 'GET_PROJECTS' });
  }
  
  render() {
    return (
      <BrowserRouter >
        <div className='maincContainer'>
          <Row className='header'>SCOPER</Row>
          <Row className='articleFirst'><Route path='/scoping' component={NavBar} /></Row>
          <Row className='articleSecond'> <MainScreen /></Row>
          <Row className='footer'><footer>✎ created by COD Team ©</footer></Row>
        </div>
      </BrowserRouter>
    );
  }
}


export default connect(store => store)(App);
