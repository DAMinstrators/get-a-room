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

	componentDidMount() {
        this.updateCanvas();
    }
		
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }

	render() {
		document.query
		var ctx = canvas.getContext("2d");
		return (
			<div className="canvas-container">
				<h3>Upload Floor Plan</h3>
				<canvas className='canvas'></canvas>
			</div>
		);
	}
}

export default FloorCanvas;
