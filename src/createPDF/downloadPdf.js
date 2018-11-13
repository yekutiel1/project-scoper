import React, { Component } from 'react';
import jsPDF from 'jspdf';
import data from '../overView.json';
import {Button} from 'reactstrap'

class DownloadPdf extends Component {

    createPdf = () => {
        var doc = new jsPDF();
        var elementHandler = {
            '#ignorePDF': function (element, renderer) {
                return true;
            }
        };
        var source = document.getElementById('pdfPreview');
        console.log(source);
        
        doc.fromHTML(
            source,
            15,
            15,
            {
                'width': 180, 
                'elementHandlers': elementHandler
            },
            () => {
                doc.save("test.pdf");
            }
        );
   

    }

    render() {
        return (
            <div >
                <Button onClick={this.createPdf}>Download Pdf</Button>
            </div>
        )
    }
}

export default DownloadPdf;