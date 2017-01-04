import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import RoomManager from './RoomManager.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			rooms: []
		};

		this.addRoom = this.addRoom.bind(this);
		this.removeRoom = this.removeRoom.bind(this);
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

	render() {
		return (
			<div>
				<RoomManager rooms={this.state.rooms} addRoom={this.addRoom} removeRoom={this.removeRoom} />
			</div>
		);
	}
}

export default App;