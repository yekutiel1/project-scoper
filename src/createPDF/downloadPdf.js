import React, { Component } from 'react';
import jsPDF from 'jspdf';
import data from '../overView.json';

class DownloadPdf extends Component {

    createPdf = () => {
   

        var doc = new jsPDF();
        var elementHandler = {
            '#ignorePDF': function (element, renderer) {
                return true;
            }
        };
        var source = document.getElementById('pdfPreview');
        doc.fromHTML(
            source,
            15,
            15,
            {
                'width': 180, 'elementHandlers': elementHandler
            },
            ()=>{
                         doc.save("test.pdf");
                     }
        );
        // source = document.getElementById('mainBlbBla');
        // doc.fromHTML(
        //     source,
        //     10,
        //     15,
        //     {
        //         'width': 180, 'elementHandlers': elementHandler
        //     },
        //     ()=>{
        //         doc.save("test.pdf");
        //     }
        // );

    }

    render() {
        return (
            <div >
                <button onClick={this.createPdf}>DownloadPdf</button>
            </div>
        )
    }
}

export default DownloadPdf;