import React, {Component} from 'react';
import '../../App.css';
import {connect} from 'react-redux'
import store from '../../store/store';
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';
import data from '../../overView.json';


class Preview extends Component {
    render() {
        let oldDate = this.props.store.oldVersionData.date;
        let date = oldDate.slice(0, 24)
        // let time = oldDate.slice(11, 16)

        return (

            <div className="viewVersion">
                <div className='hadePreview'>Date created: {date} </div>
                {/* <div className='hadePreview'>Date created: {date} {time} </div> */}
                <div className='hadePreview'>Editor: {this.props.store.oldVersionData.editorName} </div>
                <div className='hadePreview'>rejection
                    reason: {this.props.store.oldVersionData.rejectionExplenation} </div>
                <br/>
                <div>project description:<RichEditor
                    data={this.props.store.projectDescription}
                    readOnly={true}
                     /> </div>

                <div>Specification (UX):<RichEditor
                    data={this.props.store.specificationDescription }
                    readOnly={true}
                     /> </div>
                     <img src={this.props.store.specificationLink} alt="" />

                <div>High Level Architecture:<RichEditor
                    data={this.props.store.diagramDescription }
                    readOnly={true}
                     /> </div>
                     <img src={this.props.store.diagramLink} alt="" />

                <div><b>The Actors/Users:</b>
                    <ol>
                        {this.props.store.oldVersionData.allActors.map((elm, index) => {
                            return <li key={index}>
                                <p>actor name :{elm.name}</p>
                                <p>actor description: {elm.description}</p>
                            </li>
                        })}
                    </ol>
                </div>

                <div className="">
                    <b>Requirements/User Stories:</b>
                    {this.props.store.oldVersionData.allActors.map((elm, index) => {
                        return <div key={index}>
                            <ins>{elm.name + " new user stories"}</ins>
                            <ol>
                                {elm.userStoreis.map((story, i) => {
                                    return <li key={i}>{story.userStory}</li>
                                })}
                            </ol>
                        </div>
                    })}
                </div>

                <div className="">
                    <b>Subjects: </b>
                    {this.props.store.oldVersionData.subjects.map((elm, index) => {
                        return <div key={index}>
                            <p>subject: {elm.name}: description: {elm.description}</p>
                            {/* <p>{elm.description}</p> */}

                        </div>
                    })}
                </div>


                <div>
                    <p className="pdfOverview"><b> Assumptions</b></p> <br/>
                    <ul>
                        <div>{this.props.store.oldVersionData.generalAssumptions.map((elm, i) => {
                            return elm === 'true' ? <li key={i}>{data.assumptions[i].name}</li> : null
                        })}</div>

                        <div>{this.props.store.oldVersionData.currentAssumptions.map((elm, i) => {
                            return <li key={i}>{elm}</li>
                        })}</div>
                    </ul>
                </div>


                <div>
                    <p className="pdfOverview"><b> Price</b></p> <br/>
                    <ul>
                        <div>{this.props.store.oldVersionData.pricing.map((elm, i) => {

                        })}</div>

                       
                    </ul>
                </div>

            </div>
        )
    }
}

class Versions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentVersion: null
        }
    }

    componentWillMount() {
        store.dispatch({type: 'GET_VERSIONS'});
    }

    dropDown = () => {
        return <select className={'form-control'} defaultValue={this.props.oldVersionNumber} onChange={(e) => {
            store.dispatch({type: 'UPDATE_OLD_VERSION_NUMBER', payload: e.target.value});
            store.dispatch({type: 'GET_OLD_VERSION_DATA'});
        }}>
            <option value='' style={{color: 'red'}}>Select version</option>
            {this.props.versionsArray.map((version, i) => {
                return <option key={i} value={version.versionNumber}>{`Version ${version.versionNumber}`}</option>
            })}
        </select>

    };


    render() {
        console.log(this.props.oldVersionData);
        return (
            <div>
                {this.dropDown()}

                {this.props.oldVersionData !== null ? <Preview store={this.props}/> : null}
            </div>
        );
    }
}

export default connect(store => store)(Versions);

// 0: {comment: "", processTotalPrice: 0, containers: Array(9), _id: "5beac2ef99688c0468b011d4", milestoneName: "Milestone 1"}
// 1: {comment: "", processTotalPrice: 0, containers: Array(4), _id: "5beac2ef99688c0468b011c7", milestoneName: "Milestone 2"}
// 2: {comment: "", processTotalPrice: 0, containers: Array(5), _id: "5beac2ef99688c0468b011b7", milestoneName: "Milestone 3"}
