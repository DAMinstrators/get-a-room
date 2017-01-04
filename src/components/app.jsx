import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import RoomManager from './RoomManager.jsx';
import Scheduler from './Scheduler.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			rooms: []
		};

		this.addRoom = this.addRoom.bind(this);
		this.removeRoom = this.removeRoom.bind(this);

		this.makeReservation = this.makeReservation.bind(this);
		this.removeReservation = this.removeReservation.bind(this);
	}

	addRoom(name, capacity) {
		if (name) {
			const rooms = this.state.rooms.slice();
			rooms.push({name: name, capacity: capacity});
			this.setState({rooms: rooms});
		}
	}

	removeRoom(roomIndex) {
		const rooms = this.state.rooms.slice(0, roomIndex).concat(this.state.rooms.slice(roomIndex + 1));
		this.setState({rooms: rooms});
	}

	makeReservation() {

	}

	removeReservation() {

	}

	render() {
		return (
			<div>
				<RoomManager rooms={this.state.rooms} addRoom={this.addRoom} removeRoom={this.removeRoom}/>
				<Scheduler rooms={this.state.rooms} makeReservation={this.makeReservation} removeReservation={this.removeReservation}/>
			</div>
		);
	}
}

export default App;