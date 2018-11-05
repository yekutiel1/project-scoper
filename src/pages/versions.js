import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';


class Versions extends Component {
  constructor(props) {
    super(props)
    this.state = {
        currentVersion: null
    }
  }

  componentWillMount() {
    store.dispatch({ type: 'GET_VERSIONS' });
  }

  dropDown = () => {
    return <select defaultValue={this.props.oldVersionNumber} onChange={(e) => {
      store.dispatch({ type: 'UPDATE_OLD_VERSION_NUMBER', payload: e.target.value });
      store.dispatch({ type: 'GET_OLD_VERSION_DATA' });
    }}>
      <option value='' style={{ color: 'red' }} >Select version</option>
      {this.props.versionsArray.map((version, i) => {
        return <option key={i} value={version.versionNumber}>{`Version ${version.versionNumber}`}</option>
      })}
    </select>
  }


  render() {
    return (
      <div className='pricing'>
        {this.dropDown()}
      </div>
    );
  }
}




export default connect(store => store)(Versions);

