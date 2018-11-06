import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store.js';
import axios from 'axios';
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';
import data from './AssumptionsData.json'



class Assumptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalAssumptionsArr: [],
      tempAssum: '',
      variableAssumptionsArr: [],
      selectAll: false
    }
  }

  componentWillMount() {

    var Arr = this.props.generalAssumptions;
    if (Arr.length < 1) {
      data.data.map((elm, i) => { this.state.generalAssumptionsArr.push(false) })
    }
    else {
      var temp = [];
      Arr.map((elm, id) => { elm === 'true' ? temp.push(true) : temp.push(false) })
      this.setState({ generalAssumptionsArr: temp })
      this.setState({ selectAll: temp.every(elm => elm) })
    }
  }


  handleChange = (e) => {

    const id = e.target.id;
    const isChecked = e.target.checked;
    var tempArr = this.state.generalAssumptionsArr.slice();
    tempArr[id] = isChecked;
    this.setState({ generalAssumptionsArr: tempArr })
    this.setState({ selectAll: tempArr.every(elm => elm) })
  }


  selectAll = () => {

    this.setState({ selectAll: !this.state.selectAll })
    var arr = []
    this.state.generalAssumptionsArr.map(elm => {
      arr.push(!this.state.selectAll)
    })
    this.setState({ generalAssumptionsArr: arr })
  }

  sendToDB = (type, data) => {

    if (type === 'general') {
      this.props.dispatch({ type: "SAVE_GENERAL_ASSUMPTIONS", payload: data })
    }
    if (type === 'add') {
      this.props.dispatch({ type: "SAVE_ASSUMPTION", payload: data })
    }
  }


  edit = (value, index) => {

    this.props.dispatch({ type: 'EDIT_ASSUMPTION', payload: { assumption: value, index: index } })
  }


  render() {
    return (
      <div className="assumptionContainer">
        <Label for="exampleCheckbox">Select Assumptions</Label>
        <CustomInput id='selectAll' type='checkbox' label={'Select All'} checked={this.state.selectAll} onChange={this.selectAll} />
        <div>{data.data.map((item, index) => {
          return <FormGroup key={index}>
            <Form>
              <CustomInput
                className='asuumption_row'
                id={index}
                type='checkbox'
                label={item.name}
                checked={this.state.generalAssumptionsArr[index]}
                onChange={(e) => this.handleChange(e)} />
            </Form>
          </FormGroup>
        })}
        </div>
        <div >

          <AddAssumptions
            currentAssumptions={this.props.currentAssumptions}
            handleTextChange={this.handleTextChange}
            sendToDB={this.sendToDB}
            state={this.state}
            edit={this.edit}
            startEdit={this.startEdit} />
        </div>
      </div>
    );

  }
}


class AddAssumptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      index: null,
      editMonde: false
    }
  }


  startEdit = (index) => {

    this.setState({ inputValue: this.props.currentAssumptions[index], index: index, editMonde: true })
  }

  handleTextChange = (e) => {

    this.setState({ inputValue: e.target.value })
  }

  handleBtn = () => {

    if (this.state.editMonde === false) {
      return <button className='saveBtn' onClick={() => {
        this.props.sendToDB('add', this.state.inputValue);
        this.setState({ inputValue: "" })
      }}>Add</button>
    } else {
      return <button className='editBtn'
        onClick={() => {
          this.props.edit(this.state.inputValue, this.state.index);
          this.setState({ editMonde: false, inputValue: "" })
        }}>
        Edit</button>
    }
  }

  delete = (index) => {

    store.dispatch({ type: "DELETE_ASSUMPTION", payload: index })
  }

  render() {
    return (
      <div >
        <div >
          {this.props.currentAssumptions.map((elm, index) => {
            return (
              <div className='asuumption_row' key={index} >
                <div style={{ flex: 11.5 }}>{elm}</div>
                <div className='iconDiv'>
                  <div className='icon btn_delete' onClick={() => this.delete(index)} >🗑</div>
                  <div className='icon btn_edit' onClick={() => this.startEdit(index)} >✎</div>
                </div>
              </div>
            )
          })}
          <div className='formAssumptionsContainer'>
            <textarea
              style={{ width: "100%" }}
              //className='actorDescription'
              value={this.state.inputValue}
              onChange={this.handleTextChange}
              placeholder='Add Assumption'>
            </textarea>
            <br />
            {this.handleBtn()}
            <button className='saveBtn' onClick={() => { this.props.sendToDB('general', this.props.state.generalAssumptionsArr) }}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(store => store)(Assumptions);