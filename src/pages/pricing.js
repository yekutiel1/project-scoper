import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';

import data from '../rest_API_example_of_task_container.json';

class Pricing extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className='pricing'>
      <div className='singleProcessContainer' >
          <p >Process</p>
          <p className='days'>Timeline</p>
          <p className='days'>Days</p>
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
  

  totalDays = 0

  render() {
    this.totalDays = 0
    return (
      <div>
        
        <div className='mileStone'>
          <h3 className='processName'>{this.props.process.milstoneName}</h3>

          <div className='processContainers'>

            {this.props.process.containers.map((container, i) => {
              console.log(this.totalDays);
              
              this.totalDays += parseInt(container.days);
              return <ul className='singleProcessContainer' key={i}>
                <li className='name'>{container.name}</li>
                <p className='days'>{container.days}</p>
              </ul>
            })}
          </div>
        </div>

        <h1>Total days {this.totalDays}</h1>
      </div>
    )
  }
}


export default connect(store => store)(Pricing);

