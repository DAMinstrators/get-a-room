import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import RoomList from './RoomList.jsx';
import DateSelector from './DateSelector.jsx';
import RoomSelector from './RoomSelector.jsx';
import TimeSlotSelector from './TimeSlotSelector.jsx';

function isValidDate(date) {
	if ( Object.prototype.toString.call(date) === "[object Date]") {
		if ( isNaN( date.getTime() ) ) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

class Scheduler extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedRoomIndex: -1,
			selectedDate: "",
			selectedSlots: {}
		};

		this.handleSelectDate = this.handleSelectDate.bind(this);
		this.handleSelectRoom = this.handleSelectRoom.bind(this);
		this.handleSelectTimeSlot = this.handleSelectTimeSlot.bind(this);
	}

	handleSelectDate(date) {
		const selectedDate = new Date(date);
		if (isValidDate(selectedDate) && date.length === 10) {
			this.setState({selectedDate: selectedDate});
		} else {

			this.setState({selectedRoomIndex: -1, selectedDate: "", selectedSlots: []});
		}
	}

	handleSelectRoom(roomIndex) {
		this.setState({selectedRoomIndex: roomIndex});
	}		

	handleSelectTimeSlot(timeSlot) {
		const selectedSlots = this.state.selectedSlots;

		if (!selectedSlots[timeSlot]) {
			selectedSlots[timeSlot] = 1;
		} else {
			selectedSlots[timeSlot] = 0;
		}

		this.setState({selectedSlots: selectedSlots});
	}

	render() {
		return (
			<div className="scheduler-container">
				<h3>Scheduler</h3>
				<DateSelector selectDate={this.handleSelectDate} />
				<RoomSelector rooms={this.props.rooms} selectedDate={this.state.selectedDate} selectedRoomIndex={this.state.selectedRoomIndex} selectRoom={this.handleSelectRoom} />
				<TimeSlotSelector rooms={this.props.rooms} selectedDate={this.state.selectedDate} selectedRoomIndex={this.state.selectedRoomIndex} selectedTimeSlots={this.state.selectedSlots} selectTimeSlot={this.handleSelectTimeSlot} scheduler={this.props.scheduler} />
			</div>
		);
	}
}

export default Scheduler;