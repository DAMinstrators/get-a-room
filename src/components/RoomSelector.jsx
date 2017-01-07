import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import SelectRoomButton from './SelectRoomButton.jsx';

class RoomSelector extends Component {
	constructor(props) {
		super(props);
	}

	handleSelectRoom = (roomIndex) => {
		this.props.selectRoom(roomIndex);
	}

	render() {
		console.log(this.props.rooms);
		let roomsList = this.props.rooms.map( (room, i) => {
			let selected = "";
			if (i === this.props.selectedRoomIndex) {
				selected = "selected";
			}

			return (
				<li key={i} className={selected}>
					<SelectRoomButton roomIndex={i} name={room.name} capacity={room.capacity} selectRoom={this.handleSelectRoom} />
				</li>
			);
		});

		if (this.props.selectedDate && !this.props.rooms.length) {
			return <li className="no-rooms">No rooms available for this organization. Please add a room.</li>;
		}

		if (this.props.selectedDate) {
			return (
				<div className="selector-container">
					<h3>Select a Room</h3>
					<ul className="room-selector clear">
						{roomsList}
					</ul>
				</div>
			);
		} else {
			return null;
		}
		
	}
}

export default RoomSelector;