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
			selectedSlots: {},
			selectedSlot: 0,
			errorMessage: ""
		};

	}

	handleSelectDate = (date) => {
		const selectedDate = new Date(date);
		if (isValidDate(selectedDate) && date.length === 10) {
			this.setState({selectedDate: date});//store the string version (just the timestamp)
		} else {

			this.setState({selectedRoomIndex: -1, selectedDate: "", selectedSlots: {}});
		}
	}

	handleSelectRoom = (roomIndex) => {
		this.setState({selectedRoomIndex: roomIndex});
		this.setState({selectedSlots: {}});
	}

	handleSelectTimeSlot = (timeSlot) => {
		const selectedSlots = this.state.selectedSlots;

		if (!selectedSlots[timeSlot]) {
			selectedSlots[timeSlot] = 1;
		} else {
			selectedSlots[timeSlot] = 0;
		}

		this.setState({selectedSlots: selectedSlots, selectedSlot: timeSlot});
	}

	handleReservationRequest() {
		if (this.state.selectedRoomIndex >= 0) {
			const date = new Date(this.state.selectedDate);
			const roomName = this.props.rooms[this.state.selectedRoomIndex].name;
			//UPDATE: remove selectedSlot and use selectedSlots so that user can choose multiple time slots
			const selectedTimeSlot = this.state.selectedSlot;
			const userName = "test";

			console.log(isValidDate(date), roomName, selectedTimeSlot, userName);
			if (isValidDate(date) && roomName && selectedTimeSlot && userName) {
				//modify date for API by placing year at the end of the time stamp
				const apiDate = this.state.selectedDate.substring(5) + "-" + this.state.selectedDate.substring(0, 4);
				const data = "date=" + apiDate + "&roomName=" + roomName + "&startTime=" + selectedTimeSlot + "&userName=" + userName;
				this.props.httpRequest("post", "/reservation", data, (result) => {
					console.log('sucess!!!!!!!!!!!');
					//this.setState({successMessage: "Reservation details: " + result});
				});
			} else {
				this.setState({errorMessage: "Please make sure you've selected a room and time slot."});
			}
		} else {
				this.setState({errorMessage: "Please make sure you've selected a room."});
		}
	}

	render() {
		let successMessage = "";
		let errorMessage = "";
		if (this.state.successMessage) {
			successMessage = <div className="success">{ this.state.successMessage }</div>;
		}

		if (this.state.errorMessage) {
			errorMessage = <div className="error">{ this.state.errorMessage }</div>;
		}

		return (
			<div className="scheduler-container">
				<h2>Get a Room! Scheduler</h2>
				{successMessage}
				{errorMessage}
				<DateSelector selectDate={this.handleSelectDate} />
				<RoomSelector rooms={this.props.rooms} selectedDate={this.state.selectedDate} selectedRoomIndex={this.state.selectedRoomIndex} selectRoom={this.handleSelectRoom} />
				<TimeSlotSelector rooms={this.props.rooms} selectedDate={this.state.selectedDate} selectedRoomIndex={this.state.selectedRoomIndex} selectedTimeSlots={this.state.selectedSlots} selectTimeSlot={this.handleSelectTimeSlot} scheduler={this.props.scheduler} />
				<button onClick={this.handleReservationRequest}>Reserve Room</button>
			</div>
		);
	}
}

export default Scheduler;
