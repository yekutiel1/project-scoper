import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';

class UserStories extends Component {
    constructor(props) {
        super(props);
        let state = {};
        this.props.actorsArray.map((actor, index) => {
            state[index] = false
        })
        this.state = state;
    }

    displayInput = (index) => {
        this.setState({[index]: !this.state[index]});
    }

    showActors = () => {
     return this.props.actorsArray.map((actor, index) => {
       
                  return  <div className='addUserStory' key={index}>
                     
                        <div className='addUserStoryActor' onClick={() => this.displayInput(index)}>{actor.name}</div>
                        {/* {this.state[index] ?<ShowAllUserStory actor={actor} indexOfActor={this.props.indexOfActor} startEditUserStory={this.startEditUserStory} />: null} */}
                        {this.state[index] ? <UserStoryForm store={this.props} actor={actor} indexOfActor={index} /> : null}
                </div>
                })
            }

    render() {
        
        return (
            <div className='formContainer'>
                {this.showActors()}
            </div>
        )
    }
}


class UserStoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUserStoryIndex: '',
            editUserStoryId: '',
            editMode: false,
            selectedSubject: '',
            titleInput: '',
            userStoryInput: `As a ${this.props.actor.name}: `,
        }
    }

    saveUserStory = () => {
        store.dispatch({
            type: 'SAVE_USER_STORY', payload: {
                currentActorId: this.props.actor._id,
                indexOfActor: this.props.indexOfActor,
                userStory: {userStory: this.state.userStoryInput, title: this.state.titleInput, subject: this.state.selectedSubject}
            }
        })
        this.setState({titleInput: '', userStoryInput: `As a ${this.props.actor.name}: `});
    }

    editUserStory = () => {
        store.dispatch({
            type: "EDIT_USER_STORY", payload: {
                editUserStoryId: this.state.editUserStoryId,
                editUserStoryIndex: this.state.editUserStoryIndex,
                indexOfActor: this.props.indexOfActor,
                editUserStoryIndex: this.state.editUserStoryIndex,
                userStory: {userStory: this.state.userStoryInput, title: this.state.titleInput, subject: this.state.selectedSubject}
            }
        });
        this.setState({titleInput: '', userStoryInput: `As a ${this.props.actor.name}: `, editMode: false,});
    }
   
    startEditUserStory = (editUserStoryIndex, userStory) => {
        
        this.setState({selectedSubject: userStory.subject, titleInput: userStory.title, userStoryInput: userStory.userStory, editUserStoryId: userStory._id, editUserStoryIndex: editUserStoryIndex, editMode: true })
    }

    editBtn = () => {
        return <button className="editBtn" onClick={this.editUserStory}>Update</button>
    }

    saveBtn = () => {
        return this.state.editMode ? this.editUserStory() :
            <button className="saveBtn" onClick={this.saveUserStory}>Save</button>
    }

    dropDown = () => {
        
        return <select value={this.state.currentActor} onChange={(e) => { this.setState({ currentActor: e.target.value, selectedSubject: e.target.value }) }}>
            <option value='' style={{ color: 'red' }} >Select subject</option>
            {this.props.store.subjects.map((subject, index) => {
                return <option key={index} value={subject.name} defaultValue={this.state.selectedSubject}>{subject.name}</option>
            })}
        </select>
    }

    userStoryForm = () => {
        return <div>
            <input type="text" placeholder='title' value={this.state.titleInput} onChange={e => this.setState({titleInput: e.target.value})}/>
            <textarea className='actorDescription' value={this.state.userStoryInput} onChange={e => this.setState({userStoryInput: e.target.value})}/>
            <br />
            {this.state.editMode ? this.editBtn() : this.saveBtn()}
        </div>
    }

    render() {
        
        return (
            <div className='userStoryInput'>
                <ShowAllUserStory actor={this.props.actor}  indexOfActor={this.props.indexOfActor} startEditUserStory={this.startEditUserStory} />
                {this.dropDown()}
                {this.state.selectedSubject === '' ? null : this.userStoryForm()}
            </div>
        )
    }
}

class ShowAllUserStory extends Component {
    render() {
        
        return (
            <div className='viewUserStory'>
                {this.props.actor.userStoreis.map((userStory, index) => {
                    return <div className='singleUserStory' key={index}>
                        <p className='details'>{userStory.subject}</p>
                        <p className='details'>{userStory.title}</p>
                        <p className='details'>{userStory.userStory}</p>
                        <div className='iconDiv'>
                            <div className='icon btn_edit' onClick={() => { this.props.startEditUserStory(index, userStory) }}>✎</div>
                            <div className='icon btn_delete' onClick={() => { store.dispatch({ type: 'DELETE_USER_STORY', payload: {actorId: this.props.actor._id   , indexOfActor: this.props.indexOfActor, storyLocation: index}})}}>🗑</div>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}


export default connect(store => store)(UserStories);
  