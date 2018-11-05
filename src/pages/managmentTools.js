import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store.js';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PDFpreview  from './pdfPreview';
import Versions  from './versions.js';
import PrintButton from '../createPDF/PrintButton.js'  

import RichEditor from '../richEditor/richEditor.js'



class ManagmentTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayPdf: false
        }
    }
    render() {
        
        return (
            <div>
                <h1>Start scoping</h1>
                <select defaultValue={this.props.currentProject} onChange={(e) => {
                    store.dispatch({ type: 'UPDATE_CURRENT_PROJECT_ID', payload: e.target.value });
                    store.dispatch({ type: 'GET_ALL_DATA' });
                }}>
                    <option value='' style={{ color: 'red' }} >Select project</option>
                    {this.props.projectsArray.map((elm, i) => {
                        return <option key={elm._id} value={elm._id}>{elm.projectName}</option>})}
                </select>
                {this.props.currentProject === '' ? <CreateNewProject /> : null}
                {this.props.currentProject === '' ? null : <ScopingContinuation store={this.props} />}

            </div>
        );
    }
}

class CreateNewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            editorName: "",
        }
    }

    saveBtn = () =>{
        var inputEmpty = this.state.projectName === '' || this.state.editorName === '';
       return <button className={inputEmpty ? 'disableBtn': 'saveBtn'} onClick={() => {
           store.dispatch({type: 'CREATE_NEW_PROJECT', payload: this.state})
            {/* this.createNewProject(this.state) */}
            this.setState({ projectName: "",editorName: "",})
            }}><Link to='/scoping' >Create New Project</Link></button>
    }
    render() {
        return (
            <div className='newProject'>

                <input type="text" placeholder='ProjectName' value={this.state.projectName} onChange={(e) => {
                    this.setState({ projectName: e.target.value })
                }} />
                <input type="text" placeholder='Editor name' value={this.state.editorName} onChange={(e) => {
                    this.setState({ editorName: e.target.value })
                }} />
                <br/>
                {this.saveBtn()}
            </div>
        );
    }
}

class ScopingContinuation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newVersionMode: false,
            displayPdf: false,
            displayVersions: false
        }
    }
    cancelNewVersionMode = () => {
        this.setState({ newVersionMode: false })
    }
    render() {

        return (
            <div>
                
                {this.state.newVersionMode ? null : <button><Link to='/scoping' >Continue Scoping</Link></button>}
                {this.state.newVersionMode ? null : <button onClick={() => this.setState({ newVersionMode: true })}>New version</button>}
                {this.state.newVersionMode ? <CreateNewVersion cancelNewVersionMode={this.cancelNewVersionMode} /> : null}
                <button onClick={() => this.setState({ displayPdf: !this.state.displayPdf })}>view all data</button>
                <button onClick={() => this.setState({ displayVersions: !this.state.displayVersions })}>view all versions</button>
                {this.state.displayVersions?  <Versions/>: null}
                {this.state.displayPdf ? 
                <div>
                 


                    <PrintButton  id={"pdfPreview"} label={"Create PDF file"} />
                    <PDFpreview />

                    
                </div>
                 : null}


            </div>
        );
    }
}



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
                            this.props.cancelNewVersionMode()
                            this.setState({editorNameStatus: false })
                            store.dispatch({ type: 'CREATE_NEW_VERSION', payload: this.state.editorName })
                            }}><Link to='/scoping' >Create New Version</Link></button>
                    </div>
                        : null}
            </div>
        );
    }
}



export default connect(store => store)(ManagmentTools);
