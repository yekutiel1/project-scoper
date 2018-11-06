import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import RichEditor from '../richEditor/richEditor.js'
import '../richEditor/richEditor.css';
import data from '../overView.json';




class PDFpreview extends Component {
    render() {
        return (
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
                editMode={false} 
                data = {this.props.projectDescription}
                readOnly={true}  />

                <div className="pdfOverview">
                    <b>The Actors/Users:</b>
                    <ol>
                        {this.props.actorsArray.map((elm, index)=>{
                            return  <li key={index}>
                                        <ins>{elm.name}</ins>
                                        <p>{elm.description}</p>
                                    </li>
                                })}
                    </ol>
                </div>

             
                
                <div className="pdfOverview">
                <b>Requirements/User Stories:</b>
                    {this.props.actorsArray.map((elm, index)=>{
                return <div key={index}>
                            <ins>{elm.name + " new user stories"}</ins>
                                <ol>
                                    {elm.userStoreis.map((story, i)=>{
                                        return <li key={i}>{story.userStory}</li>
                                    })}
                                </ol>
                        </div>
                    })}
                </div>

                {/* <img src='https://drive.google.com/file/d/1U7598IUpitT0q7G5_jTXKRWvjKF8qorl/view?usp=sharing' alt=""/> */}
              



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
            </div>
        );
    }
}

export default connect(store => store)(PDFpreview);



      {/* <div><p className="pdfOverview"><b>The Actors/Users:</b> </p>{this.props.actorsArray.map((elm, i) => {
                                        return <div key={i}>
                                            <ol>
                                                <li> <ins>{elm.name}</ins> <br /> {elm.description} </li>
                                            </ol>
                                        </div>
                                    })}</div> */}
                {/* <div> <p className="pdfOverview"><b>Requirements/User Stories:</b> </p>
                    {this.props.actorsArray.map((elm, i) => {
                        return <div key={i}><br /><ins>{elm.name + " new user stories"}</ins><br /><br />
                            {elm.userStoreis.map((story, i) => {
                                return <div key={i}>
                                    <ol>
                                        <li>{story}</li>
                                    </ol>
                                </div>
                            })}
                        </div>
                    })}
                </div><br /><br /> */}