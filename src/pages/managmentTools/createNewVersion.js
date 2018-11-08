import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';
import store from '../../store/store';
import {Link} from 'react-router-dom'





class CreateNewVersion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rejectionStatus: true,
            editorNameStatus: false,
            rejectionExplenation: "",
            editorName: "",
        }
    }

    render() {
        return (
            <div className='newVersion'>
                {
                    this.state.rejectionStatus ? <div>
                        <textarea cols="30" rows="10" placeholder='Rejection explenation' onChange={e => { this.setState({ rejectionExplenation: e.target.value }) }}></textarea>
                        <br />
                        <button onClick={this.props.cancelNewVersionMode}>Cancel</button>
                        <button className={this.state.rejectionExplenation  === '' ? 'disableBtn': 'saveBtn'} onClick={() => {
                            this.setState({ rejectionStatus: false, editorNameStatus: true })
                            store.dispatch({ type: 'REJECTION_EXPLENATION', payload: this.state.rejectionExplenation })
                        }}>Save rejection explenation</button>
                    </div>
                        : null}
                {
                    this.state.editorNameStatus ? <div>
                        <input type="text" placeholder='Editor name' onChange={e => { this.setState({ editorName: e.target.value }) }} />
                        <button className={this.state.editorName === '' ? 'disableBtn': 'saveBtn'} onClick={() => {
                            {/* this.props.cancelNewVersionMode() */}
                            this.setState({editorNameStatus: false })
                            store.dispatch({ type: 'CREATE_NEW_VERSION', payload: this.state.editorName })
                            }}><Link to='/scoping' >Create New Version</Link></button>
                    </div>
                        : null}
            </div>
        );
    }
}



export default connect(store => store)(CreateNewVersion);
