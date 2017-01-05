import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class SelectTimeSlotButton extends Component {
	constructor(props) {
		super(props);
		
		this.handleSelectTimeSlotButton = this.handleSelectTimeSlotButton.bind(this);
	}

	handleSelectTimeSlotButton() {
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