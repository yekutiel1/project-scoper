import React, { Component } from 'react';
import jsPDF from 'jspdf';
import data from '../overView.json';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

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
                <button className={'btn btn-primary'} onClick={this.createPdf}>Download Pdf <FontAwesomeIcon className={'mx-2'} icon={faDownload} /></button>
            </div>
        )
    }
}

export default DownloadPdf;