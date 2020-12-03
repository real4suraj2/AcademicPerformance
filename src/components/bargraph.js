import CanvasJSReact from '../canvas/canvasjs.react';
import React, { Component} from 'react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Bargraph extends Component {	
    render() {
      const options = {
        title: {
          text: "Progress Chart "
        },
        data: [{				
                  type: "column",
                  dataPoints: [
                      { label: "sub-1",  y: 10  },
                      { label: "sub-2", y: 15  },
                      { label: "sub-3", y: 25  },
                      { label: "sub-4",  y: 30  },
                      { label: "sub-5",  y: 28  }
                  ]
         }]
     }
          
     return (
        <div>
          <CanvasJSChart options = {options}
              /* onRef = {ref => this.chart = ref} */
          />
        </div>
      );
    }
  }


export default Bargraph;