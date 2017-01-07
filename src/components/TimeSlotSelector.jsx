import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import SelectTimeSlotButton from './SelectTimeSlotButton.jsx';

class TimeSlotSelector extends Component {
	constructor(props) {
		super(props);
	}

	handleSelectTimeSlot = (timeSlot) => {
		this.props.selectTimeSlot(timeSlot);
	}

	render() {
		let renderTimeSlotSelector = "";
		if (this.props.selectedRoomIndex >= 0) {
			let timeSlots = [];
			let startSlot = 9;
			let endSlot = 22;
			if (this.props.extendedHours === true) {
				startSlot = 0;
				endSlot = 24;
			}
			for (let i = startSlot; i < endSlot; i++) {
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