import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { Component } from 'react';
import '../App.css';


class PrintButton extends Component{
   pxToMm = (px) => {
    return Math.floor(px/document.getElementById('myMm').offsetHeight);
  };
  
   mmToPx = (mm) => {
    return document.getElementById('myMm').offsetHeight*mm;
  };
  
   range = (start, end) => {
      return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
  };
  render(){
    return(<div>
      <div id="myMm" style={{height: "1mm"}} />
    
      <button className='saveBtn' onClick={() => {
      const input = document.getElementById(this.props.id);
      const inputHeightMm = this.pxToMm(input.offsetHeight);
      const a4WidthMm = 210;
      const a4HeightMm = 297; 
      const a4HeightPx = this.mmToPx(a4HeightMm); 
      const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm/a4HeightMm) + 1;

      console.log({
        input, inputHeightMm, a4HeightMm, a4HeightPx, numPages, range: this.range(0, numPages), 
        comp: inputHeightMm <= a4HeightMm, inputHeightPx: input.offsetHeight
      });
      

      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');

            let pdf = null;
          // Document of a4WidthMm wide and inputHeightMm high
          {/* if (inputHeightMm > a4HeightMm) { */}
            // elongated a4 (system print dialog will handle page breaks)
             {/* pdf = new jsPDF('p', 'mm', [inputHeightMm+16, a4WidthMm]); */}
             pdf = new jsPDF('p', 'mm', 'a4');
             console.log('if');
             
          {/* }  */}
          {/* else {
             console.log('else');
            // standard a4
             pdf = new jsPDF();


          } */}

          var  numHigh = 297;
          
              pdf.addImage(imgData, 'PNG', 0, 0);


            for (let i = 0; i < numPages; i++) {
              
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, -numHigh);
              numHigh += 297
            }

              pdf.save(`${this.props.id}.pdf`);
        });
      ;
      

      
    }}>
{this.props.label}
      </button>
      </div>
    )
  }
}

export default PrintButton;
////////////////////////////////////////////////////////
// System to manually handle page breaks
// Wasn't able to get it working !
// The idea is to break html2canvas screenshots into multiple chunks and stich them together as a pdf
// If you get this working, please email me a khuranashivek@outlook.com and I'll update the article
////////////////////////////////////////////////////////
// range(0, numPages).forEach((page) => {
//   console.log(`Rendering page ${page}. Capturing height: ${a4HeightPx} at yOffset: ${page*a4HeightPx}`);
//   html2canvas(input, {height: a4HeightPx, y: page*a4HeightPx})
//     .then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       console.log(imgData)
//       if (page > 0) {
//         pdf.addPage();
//       }
//       pdf.addImage(imgData, 'PNG', 0, 0);
//     });
//   ;
// });

// setTimeout(() => {
//   pdf.save(`${id}.pdf`);
// }, 5000);