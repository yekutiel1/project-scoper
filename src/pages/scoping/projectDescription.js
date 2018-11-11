import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';

class ProjectDescription extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       projectDescription: this.props.projectDescription,
//       editMode: true,
//     }
//     if (this.state.projectDescription !== '') {
//       this.state.editMode = false;
//     }
//   }
  render() {
    return (
      <div className='formContainer description card' >
       
          <RichEditor editMode={true} data={this.props.projectDescription} save={'PROJECT_DESCREPTION'}/>
      </div>
    );

  }
}
export default connect(store => store)(ProjectDescription);