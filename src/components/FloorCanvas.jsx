import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class FloorCanvas extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }

	render() {
		let canvas = document.createElement('canvas');
		canvas.className = 'canvas';
		console.log(canvas);
		let ctx = canvas.getContext("2d");
		
		return (
			<div className="canvas-container">
				<h3>Upload Floor Plan</h3>
				{canvas}
			</div>
		);
	}
}

export default FloorCanvas;
