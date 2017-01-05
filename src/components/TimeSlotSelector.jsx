import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import SelectTimeSlotButton from './SelectTimeSlotButton.jsx';

class TimeSlotSelector extends Component {
	constructor(props) {
		super(props);

		this.handleSelectTimeSlot = this.handleSelectTimeSlot.bind(this);
	}

	handleSelectTimeSlot(timeSlot) {
		this.props.selectTimeSlot(timeSlot);
	}

	render() {
		let renderTimeSlotSelector = "";
		if (this.props.selectedRoomIndex >= 0) {
			let timeSlots = [];
			for (let i = 0; i < 24; i++) {
				let selected = "";
				if (this.props.selectedTimeSlots[i] === 1) {
					selected = "selected";
				}
				timeSlots.push(<li key={i} className={selected}><SelectTimeSlotButton timeSlot={i} selectTimeSlot={this.handleSelectTimeSlot} /></li>);
			}
			renderTimeSlotSelector = <div><h3>Select Time Slots</h3><ul className="time-slots">{timeSlots}</ul></div>;
		}

		if (this.props.selectedDate && this.props.selectedRoomIndex >= 0) {
			return (
				<div className="selector-container">
					{renderTimeSlotSelector}
				</div>
			);
		} else {
			return null;
		}
	}
}

export default TimeSlotSelector;