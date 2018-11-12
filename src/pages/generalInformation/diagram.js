import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'

import store from '../../store/store';
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';
import { Button, Input, Form } from 'reactstrap';

class Diagram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      link: ''
    }
  }
  /* <button onClick={() => store.dispatch({ type: 'SAVE_DIAGRAM', payload: this.state.link })}>Save</button> */



  render() {
    return (
      <div>
        <Form inline>
          <Input type="text" placeholder='Diagram link' onChange={(e) => this.setState({ link: e.target.value })} />
          <Button onClick={() => store.dispatch({ type: 'SAVE_DIAGRAM', payload: this.state.link })}>Save</Button>
        </Form>
        <div className="card mt-3">
          <RichEditor editMode={true} data={''} save={''} />
        </div>
      </div>
    );
  }
}


export default Diagram;

