import React, { Component } from 'react';
import jsPDF from 'jspdf';
import data from '../overView.json';

class DownloadPdf extends Component{

    createPdf = ()=>{
       let pdf = new jsPDF('p', 'mm', 'a4');

       data.overView.map((elm, index) => {
        
        pdf.text(10, 20 * (1+index), elm)
    })

       pdf.save('add.pdf');
    }

    render(){
        return(
            <div>
                <button onClick={this.createPdf}>DownloadPdf</button>
            </div>
        )
    }
}

export default DownloadPdf;