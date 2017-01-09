import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class SelectTimeSlotButton extends Component {
	constructor(props) {
		super(props);
	}

	handleSelectTimeSlotButton = (event) => {
		event.preventDefault();
		this.props.selectTimeSlot(this.props.timeSlot);
	}

	render() {
		return (
			<a href="#" onClick={this.handleSelectTimeSlotButton}>
				<span>{this.props.timeSlot}</span>
			</a>
		);
	}
}

export default SelectTimeSlotButton;