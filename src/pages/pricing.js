import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';

import data from '../rest_API_example_of_task_container.json';

class Pricing extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className='pricing'>
        <div className='mileStone' >
          <p className='process'>Process</p>
          <p className='timeline'>Timeline</p>
          <p className='days'>Days</p>
          <p className='price'>Total price (NIS)</p>
        </div>
        {
          data.milestone.map((process, i) => {
            return <Process key={i} process={process} />
          })}

      </div>
    );
  }
}

class Process extends Component {

  totalDays = null;

  render() {
    this.totalDays = 0
    return (
      <div className='mileStone'>
        <h3 className='processName'>{this.props.process.milstoneName}</h3>

        <div className='processContainers'>
          {this.props.process.containers.map((container, i) => {
            this.totalDays += parseInt(container.days);
            return <ul className='singleProcessContainer' key={i}>
              <li className='timeline'>{container.name}</li>
              <div className='days'>{container.days}</div>
            </ul>
          })}
          <h6 className='TotalDays'>{`Total days ${this.totalDays}`}</h6>
        </div>

        <div className='priceInput'>
          <input type="text" />
        </div>
      </div>
    )
  }
}


export default connect(store => store)(Pricing);

