import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import store from '../../store/store.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

import data from '../../list_of_development_task.json'




class SendDataToEvaluetor extends Component {
    constructor(props){
        super(props);
        this.state = {
            openDialog: false
        }
    }

    changeScopingStatus = () => {
        store.dispatch({type: 'CHANGE_SCOPING_STATUS'});
        this.setState({openDialog: false});
    }
   
    dialog = () => {
        return <div>
            <Modal isOpen={this.state.openDialog} toggle={this.toggle} className={this.props.className}>
                <ModalHeader >Are you sure you want to send to evaluetor?</ModalHeader>
                <ModalBody>Sendig the to evaluetor will lock all the scpoing files from edit</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.changeScopingStatus}>Send</Button>{' '}
                    <Button color="danger" onClick={() => this.setState({openDialog: false})}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    }

    render() {
        return (
            <div>
                {this.dialog()}
              <button onClick={() => this.setState({openDialog: true})}>Send to evaluetor</button>
              <Button color="success" onClick={() => store.dispatch({ type: 'SAVE_PRICING_DATA_FROM_EVALUETOR', payload: data })}>Get Data from evaluetor</Button>
            </div>
        );
    }
}

export default SendDataToEvaluetor;