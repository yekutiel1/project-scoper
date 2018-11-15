import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import store from '../../store/store';
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';

import { Button, Input} from 'reactstrap';
import data from '../../rest_API_example_of_task_container.json';

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
      process.containers.map(container=>{
        total += parseInt(container.price);
      })
    })
    return total;
  }

  grandTotal = (subTotal) => {
    let discount = this.state.discountInput;
    let grandTotal = subTotal * ((100 - discount) / 100);
    return Math.round(grandTotal);
  }

  render() {

    let subTotal = this.subTotal();

    return (<div>

        <Button color="success"  onClick={() => store.dispatch({ type: 'SAVE_PRICING_DATA', payload: data })}>Get Data from evaluetor</Button>
      <div className='pricing'>
        {/* <button onClick={()=>store.dispatch({type: 'GET_DATA_FROM_PRICING'})}>Save Data</button> */}
        
        <div className='mileStone' >
          <p className='process'>Process</p>
          <p className='timeline'>Timeline</p>
          <p className='days'>Days</p>
          <p className='price'>Total price (NIS)</p>
          <p className='processComment' >Comment</p>
        </div>
    </div>

        {
          this.props.pricing.map((process, i) => {
            return <Process key={i} process={process} ProcessIndex={i} subTotal={this.subTotal}/>
          })}
        <h6 className='grandTotal'>{`Sub Total: ${this.subTotal()}`}</h6>
        <div className='grandTotal'>
          Discount %
          
            <Input  type="number"
            value={this.state.discountInput}
            onBlur={() => { store.dispatch({ type: 'SAVE_DISCOUNT', payload:{subTotalPrice: subTotal, discount: this.state.discountInput, grandTotalPrice: this.grandTotal(subTotal) }}) }}
            onChange={e => this.setState({ discountInput: e.target.value })}
            />

        </div>
        <h6 className='grandTotal'>{`Grand Total: ${this.grandTotal(subTotal)}`}</h6>

        <Button onClick={() => store.dispatch({ type: 'SAVE_PRICING_DATA', payload: { pricing: this.props.pricing } })}>Save</Button>
        <div className='description card' >
        <RichEditor readOnly={false} data={this.props.additionalPricing} save={'SAVE_ADDITIONAL_PRICING'} placeholder='Add pricing...'/>
        </div>
      </div>
    );
  }
}



class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processPrice: 0,
      processComment: this.props.process.comment,
      addContainer: false
    }
  }

  componentWillMount() {
    this.processPrice();
  }

  totalDays = null;
  

  cancelAddContainer = ()=>{
    this.setState({addContainer: false});
  }

  processPrice = () => {
    let processPrice = 0;
    this.props.process.containers.map((container, i) => {
      processPrice += parseInt(container.price);
    })
    this.setState({ processPrice: processPrice })
    this.props.subTotal(this.state.processPrice);
  }

  render() {
    
    this.totalDays = 0
    return (
      <div className='mileStone'>
        <h3 className='processName'>{this.props.process.milestoneName}</h3>

        <div className='processContainers'>
          {this.props.process.containers.map((container, i) => {
            console.log(container.days);
            
            if (container.days !== undefined) {
            this.totalDays += parseInt(container.days);
            }
            return <Container key={i} container={container} containerIndex={i} ProcessIndex={this.props.ProcessIndex} processPrice={this.processPrice} />
          })}
          {this.state.addContainer ? <AddContainer ProcessIndex={this.props.ProcessIndex} cancelAddContainer={this.cancelAddContainer}/> : null }
          <div className='TotalDays'>
            <h6 >{`Total days ${this.totalDays}`}</h6>
            <h6 >{`Total price ${this.state.processPrice}`}</h6>
         <button onClick={()=>this.setState({addContainer: true})}>Add Container</button>
          </div>
        </div>
        <textarea className='processComment'
        value={this.state.processComment}
         onChange={e => this.setState({processComment: e.target.value })}
         onBlur={e => {
            store.dispatch({ type: 'ADD_COMMENT_TO_PROCESS', payload: { processComment: this.state.processComment, ProcessIndex: this.props.ProcessIndex }});
          }}
         />
      </div>
    )
  }
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceInput: this.props.container.price
    }
  }
  render() {
    return (
      <ul className='singleProcessContainer'>
        <li className='timeline'>{this.props.container.containerName}</li>
        <div className='days'>{this.props.container.days}</div>
        <Input type="number"
          value={this.state.priceInput}
          onBlur={e => {
            store.dispatch({ type: 'ADD_PRICE_TO_CONTAINER', payload: { price: parseInt(e.target.value), ProcessIndex: this.props.ProcessIndex, containerIndex: this.props.containerIndex }});
            this.props.processPrice();
          }}
          onChange={e => this.setState({ priceInput: e.target.value })}
        />
      </ul>
    )
  }
}

class AddContainer extends Component{
  constructor(props){
    super();
    this.state = {
      containerName: '',
      price: ''
    }
    
  }
  handleInput = (e) =>{
    this.setState({[e.target.name] : e.target.value});
  }
  saveDataToState = () => {
    store.dispatch({type: 'ADD_CONTAINER_TO_PROCESS', payload: this.state, processIndex: this.props.ProcessIndex});
    this.props.cancelAddContainer();
  }
  saveBtn = () => {
    var inputEmpty = this.state.containerName === '' || this.state.price === '';
    return <div>
      <button className={inputEmpty ? 'disableBtn btn btn-secondary' : 'btn btn-primary'} onClick={this.saveDataToState}>Save</button>
      <button onClick={()=>this.props.cancelAddContainer()}>Cancel</button>
    </div>
}
  render(){
    console.log(this.props.ProcessIndex);

    return(
      <li>
        <input type="text" name='containerName' placeholder='Container name' onChange={this.handleInput}/>
        <input type="number" name='price' placeholder='Price' onChange={this.handleInput}/>
        {this.saveBtn()}
      </li>
    )
  }
}





export default connect(store => store)(Pricing);

