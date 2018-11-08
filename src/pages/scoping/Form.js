import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../App.css';


class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            nameInput: '',
            descriprionInput: '',
            editActorIndex: '',
            currentActorId: '',
            editMonde: false,
            deleteMode: false
        }
    }

    handleInput = (inputName, value) => {
        this.setState({[inputName]: value});
    }
    
    saveActor = () => {
        this.props.dispatch({
            type: `SAVE_${this.props.dispatchType}`, payload: {
                name: this.state.nameInput,
                description: this.state.descriprionInput,
            }
        });
        this.setState({nameInput: '', descriprionInput: ''});
    }

    editActor = () => {
        this.props.dispatch({
            type: `EDIT_${this.props.dispatchType}`, payload: {
                editActorIndex: this.state.editActorIndex,
                currentActorId: this.state.currentActorId,
                name: this.state.nameInput,
                description: this.state.descriprionInput,
            }
        });
        this.setState({editMonde: false, nameInput: '', descriprionInput: ''});
    }

    cancelEditActor = () => {
        this.setState({editMonde: false, nameInput: '', descriprionInput: ''});
    }

    startEditActor = (actorName, actorDescription, index, currentActorId) => {
        this.setState({editMonde: true, nameInput: actorName, descriprionInput: actorDescription, editActorIndex: index, currentActorId: currentActorId});
    }

    deleteActor = (index, currentActorId) => {
        this.props.dispatch({type: `DELETE_${this.props.dispatchType}`, payload: {index, currentActorId}})
    }

    startDeleteActor = (index, currentActorId) => {
        this.setState({deleteMode : true,  editActorIndex: index,  currentActorId : currentActorId})
    }

    cancelDeleteActor = () => {
        this.setState({deleteMode: false});
    }

    deleteDialog = () => {
        return <div className='deleteDialog'>
            <h4>Are you sure you want to delete?</h4>
            <p>Deleting the Actor will delete all the user stories it's contians</p>
            <button className='deleteBtn'  onClick={() => this.deleteActor(this.state.editActorIndex, this.state.currentActorId)}>Delete</button>
            <button className='editBtn' onClick={this.cancelDeleteActor}>Cancel</button>
        </div>
    }

    render(){
        return(
            <div className='formContainer'>
                {this.state.deleteMode ? this.deleteDialog() : null}
                <FormActorInput
                name={this.props.name}
                state={this.state}
                handleInput={this.handleInput}
                saveActor={this.saveActor}
                editActor={this.editActor}
                cancelEditActor={this.cancelEditActor}
                />
                
                <ShowActors
                name={this.props.name}
                store={this.props}
                enableDelete={this.props.enableDelete}
                startEditActor={this.startEditActor}
                startDeleteActor={this.startDeleteActor}
                deleteActor={this.deleteActor}
                />
            </div>
        )
    }
}

class FormActorInput extends Component{

    saveBtn = (input, textarea, click) => {
        var inputEmpty = input === '' || textarea === '';
        return <button className={inputEmpty ? 'disableBtn' : 'saveBtn'} onClick={click}>Add</button>
    }

    editBtn = () => {
        return <div>
            <button className='cancelBtn' onClick={this.props.cancelEditActor}>Cancel</button>
            <button className='editBtn' onClick={this.props.editActor}>Update</button>
        </div>
    }

    render(){
        return(
            <div>
                <input className='actorsInput' placeholder={`${this.props.name} name`} value={this.props.state.nameInput}
                    onChange={e => this.props.handleInput('nameInput', e.target.value)} />
                <textarea className='actorDescription' placeholder={`${this.props.name} descriprion`} value={this.props.state.descriprionInput}
                    onChange={e => this.props.handleInput('descriprionInput', e.target.value)} />
                <br />
                {this.props.state.editMonde ? this.editBtn() : this.saveBtn( this.props.state.nameInput, this.props.state.descriprionInput, this.props.saveActor)}
            </div>
        )
    }
}
class ShowActors extends Component{
    arr = null;
    updtaeArr = () => {
        if (this.props.name === 'Actor') {
            this.arr = this.props.store.actorsArray;
        }else{
            this.arr = this.props.store.subjects;
        }
    }

    render(){
        this.updtaeArr()
        return(
            <div className='showActors'>
                            
            {this.arr.map((elm, index) => {
                        return <div id='actorView' key={index}>
                            <div className='details'>
                                <u>{elm.name}</u>
                                <p>{elm.description}</p>
                            </div>

                          {this.props.enableDelete ? <div className='iconDiv'>
                                {/* <div className='icon btn_delete' onClick={() => this.props.deleteActor(index, elm._id)}>🗑</div> */}
                                <div className='icon btn_edit' onClick  ={() => this.props.startEditActor(elm.name, elm.description, index, elm._id)}>✎</div>
                                <div className='icon btn_delete' onClick={() => this.props.startDeleteActor(index, elm._id)}>🗑</div>
                            </div> : null }
                        </div>
                    })}
            </div>
        )
    }
}

export default connect(store => store)(Form);
