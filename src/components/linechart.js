
import CanvasJSReact from '../canvas/canvasjs.react';
var React = require('react');
var Component = React.Component;

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class LineChart extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: "Student Progress"
			},
			axisX: {
				title: "Report IDs",
				interval: 1
			},
			axisY: {
				title: "Percentage",
				suffix: "%",
				minimum: 0,
				maximum: 100,
			},
			toolTip: {
				content: "{name} : {y}%"
			},
			data: [{
				type: "splineArea",
				dataPoints: this.props.data.map((element, idx) => {
					return { x: idx + 1, y: (element.obtainedMarks / element.maximumMarks) * 100, name: element.title };
				})
			}]
		}
		return (
			<div>
				<CanvasJSChart options={options}
				/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default LineChart;