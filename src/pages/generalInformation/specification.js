import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'

import store from '../../store/store';
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';
import { Button, Input,  Form} from 'reactstrap';

class Specification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      link: this.props.specificationLink
    }
  }

    render() {
        return (
            <div>
                <Form inline>
                    <Input className={'mr-1'} type="text" placeholder='Specification link'
                     onChange={(e) => this.setState({ link: e.target.value })}
                     value={this.state.link} />
                    <Button onClick={() => store.dispatch({ type: 'SAVE_SPECIFICATION_LINK', payload: this.state.link })}>Save</Button>

                </Form>
                <div className="card mt-3">
                    <RichEditor editMode={true} data={this.props.specificationDescription} save={'SAVE_SPECIFICATION_DESCRIPTION'} placeholder='Add specification (UX)' />
                </div>
            </div>
    );
    }
}


export default connect(store => store)(Specification);

