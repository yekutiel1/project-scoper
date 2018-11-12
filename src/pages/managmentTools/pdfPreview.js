import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';
import data from '../../overView.json';
import DevelopmentTasks from './developmentTasksTable.js'


import axios from 'axios';
// import fileDownload from 'react-file-download';




class PDFpreview extends Component {
    render() {

        return (
            
            //  <button onClick={()=>{
            //     var url = `http://10.2.1.102:3000/api/pdf`;
            //     var url = `http://10.2.1.102:3000/api/pdf/createPdf/${this.props.currentProject}`; 
            //     console.log(url);
                
            //     axios.get(url)
            //     .then(function(res) {
            //         console.log(res);
            //         fileDownload(res.data, "profilepic.pdf"); 
            //         {/* store.dispatch({type: type, payload: res.data}); */}
            //     });
            //     }}>Download</button>
                 
<div>
            <div id='pdfPreview' className="pdfPreview">
                <div className="mainBlbBla">
                    <h3 className="pdfPreviewTitel"><b> Offer for Development of Disk In Pro <br /> NEAR phase 2 web app </b></h3><br />
                    <b className="pdfOverview"> Overview</b> <br /><br />

                    {
                        data.overView.map((elm, index) => {
                            return <p key={index}>{elm}</p>
                        })
                    }

                    <ul>
                        {data.servicesList.map((elm, index) => {
                            return <li key={index}>{elm}</li>
                        })}
                    </ul>

                </div>

                <div className="imgDiv">
                    {data.imgUrlLinks.map((img, i) => {
                        return <img key={i} src={img} alt="" />
                    })}
                </div>

                <b className="pdfOverview">Project</b>

                <RichEditor
                    data={this.props.projectDescription}
                    readOnly={true}
                     />

                <div className="pdfOverview">
                    <b>The Actors/Users:</b>
                    <ol>
                        {this.props.actorsArray.map((elm, index) => {
                            return <li key={index}>
                                <ins>{elm.name}</ins>
                                <p>{elm.description}</p>
                            </li>
                        })}
                    </ol>
                </div>



                <div className="pdfOverview">
                    <b>Requirements/User Stories:</b>
                    {this.props.actorsArray.map((elm, index) => {
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





                <div>
                    <p className="pdfOverview"><b> Assumptions</b></p> <br />
                    <ul>
                        <div>{this.props.generalAssumptions.map((elm, i) => {
                            return elm === 'true' ? <li key={i}>{data.assumptions[i].name}</li> : null
                        })}</div>

                        <div>{this.props.currentAssumptions.map((elm, i) => {
                            return <li key={i}>{elm}</li>
                        })}</div>
                    </ul>
                </div>
                <DevelopmentTasks />
            </div>
            </div>

        );


    }
}

export default connect(store => store)(PDFpreview);

