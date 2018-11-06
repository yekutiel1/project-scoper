import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';

import data from '../rest_API_example_of_task_container.json';

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountInput: this.props.discount,
    }
  }

  subTotal = () => {
    let total = 0;
    this.props.pricing.map(process => {
      total += parseInt(process.processTotalPrice);
    })
    return total;
  }
  grandTotal = (subTotal) => {
    let discount = this.state.discountInput;
    let grandTotal = subTotal * ((100 - discount) / 100);
   return Math.round( grandTotal);
  }

  render() {

    let subTotal = this.subTotal();

    return (
      <div className='pricing'>
        {/* <button onClick={()=>store.dispatch({type: 'GET_DATA_FROM_PRICING'})}>Save Data</button> */}
        <button onClick={() => store.dispatch({ type: 'SAVE_PRICING_DATA', payload: data })}>Get Data from evaluetor</button>
        <div className='mileStone' >
          <p className='process'>Process</p>
          <p className='timeline'>Timeline</p>
          <p className='days'>Days</p>
          <p className='price'>Total price (NIS)</p>
        </div>

        {
          this.props.pricing.map((process, i) => {
            return <Process key={i} process={process} index={i} />
          })}
          <h6 className='grandTotal'>{`Sub Total: ${this.subTotal()}`}</h6>
         <div className='grandTotal'>
            Discount %
            <input
            value={this.state.discountInput}
            onBlur={() => { store.dispatch({ type: 'SAVE_DISCOUNT', payload: this.state.discountInput})}}
            onChange={e=>this.setState({discountInput: e.target.value})}
             type="number"/>
             </div>
          <h6 className='grandTotal'>{`Grand Total: ${this.grandTotal(subTotal)}`}</h6>
        <button onClick={() => store.dispatch({ type: 'SAVE_PRICING_DATA', payload: { pricing: this.props.pricing } })}>Save</button>
      </div>
    );
  }
}

class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceInput: this.props.process.processTotalPrice
    }
  }
  
  totalDays = null;

  render() {
    this.totalDays = 0
    return (
      <div className='mileStone'>
        <h3 className='processName'>{this.props.process.milestoneName}</h3>

        <div className='processContainers'>
          {this.props.process.containers.map((container, i) => {
            this.totalDays += parseInt(container.days);
            return <ul className='singleProcessContainer' key={i}>
              <li className='timeline'>{container.containerName}</li>
              <div className='days'>{container.days}</div>
            </ul>
          })}
          <h6 className='TotalDays'>{`Total days ${this.totalDays}`}</h6>
        </div>

        <div className='priceInput'>
          <input type="number"
            value={this.state.priceInput}
            onBlur={() => { store.dispatch({ type: 'ADD_PRICE_TO_PROCESS', payload: { price: this.state.priceInput, index: this.props.index }})}}
            onChange={e => this.setState({ priceInput: e.target.value })} />
        </div>
      </div>
    )
  }
}


export default connect(store => store)(Pricing);

