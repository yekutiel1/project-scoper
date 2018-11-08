import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import store from '../../store/store';
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';

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
        <input type="text" placeholder='Diagram link' onChange={(e) => this.setState({ link: e.target.value })} />
        <button onClick={() => store.dispatch({ type: 'SAVE_DIAGRAM', payload: this.state.link })}>Save</button>
        <RichEditor editMode={true} data={''} save={''}/>
      </div>
    );
  }
}
export default Diagram;

