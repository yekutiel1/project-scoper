import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';
import RichEditor from '../richEditor/richEditor.js'
import '../richEditor/richEditor.css';
import { Button } from 'reactstrap';
import { Form, Input } from 'reactstrap';
// import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class Diagram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      link: ''
    }
  }
  
  render() {
    return (
      <div>
         <Input placeholder="default" type="text" placeholder='Diagram link' onChange={(e) => this.setState({ link: e.target.value })}/>
        {/* <input type="text" placeholder='Diagram link' onChange={(e) => this.setState({ link: e.target.value })} /> */}
        {/* <button onClick={() => store.dispatch({ type: 'SAVE_DIAGRAM', payload: this.state.link })}>Save</button> */}
        <Button onClick={() => store.dispatch({ type: 'SAVE_DIAGRAM', payload: this.state.link })} color="secondary">Save</Button>
        <RichEditor editMode={true} data={''} save={''}/>
      </div>
    );
  }
}


export default Diagram;

