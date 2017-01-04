import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import RemoveRoom from './RemoveRoom.jsx';

class RoomList extends Component {
	constructor(props) {
		super(props);
		
		this.handleRemoveRoom = this.handleRemoveRoom.bind(this);
	}

	handleRemoveRoom(roomIndex) {
		this.props.removeRoom(roomIndex);
	}

	render() {
		let roomsList = this.props.rooms.map( (room, i) => {
			let capacity = parseInt(room.capacity, 10);
			if (!capacity) {
				capacity = "Capactity not set";
			}
			return (
				<li key={i}>
					<span>{room.name}</span>,
					<span>{capacity}</span>
					<RemoveRoom roomIndex={i} removeRoom={this.handleRemoveRoom}/>
				</li>
			);
		});
		return (
			<div className="room-list-container">
				<h3>Organization Rooms</h3>
				<ul className="room-list">
					{roomsList}
				</ul>
			</div>
		);
	}
}

export default RoomList;