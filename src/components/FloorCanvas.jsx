import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class FloorCanvas extends Component {
	constructor(props) {
		super(props);

		// this.handleSelectDate = this.handleSelectDate.bind(this);
	}

	// handleSelectDate(event) {
	// 	this.props.selectDate(event.target.value);
	// }

	render() {
		return (
			<div className="canvas-container">
				<h3>Upload Floor Plan</h3>
				<canvas className='canvas'></canvas>
			</div>
		);
	}
}

export default FloorCanvas;
