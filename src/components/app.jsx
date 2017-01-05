import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import RoomManager from './RoomManager.jsx';
import Scheduler from './Scheduler.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			rooms: [],
			scheduler: {
				selectedRoomIndex: "",
				reservations: {}
			}
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

	httpRequest(method, url, data, callback) {
		let xhttp = new XMLHttpRequest();
		let params = "";
		if (data) {
			params = data;
		}
		method = method.toLowerCase();

		xhttp.open(method, url, true);

		if (method === "getting") {	
			console.log("Getting...", url, data, callback);
			xhttp.setRequestHeader("Content-type", "application/json");
		}

		if (method === "post") {	
			console.log("Posting...", callback);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		xhttp.onreadystatechange = () => {
			if (xhttp.status == 200 && xhttp.readyState == 4) {
				console.log(xhttp.responseText);
				//console.log("Response Text: ", xhttp.responseText);
				callback(null, JSON.parse(xhttp.responseText));
			}

			if (xhttp.status == 400 || xhttp.status == 500) {
				callback(url + " could not be reached");
			}
		}

		xhttp.send(params);
	}

	render() {
		return (
			<div>
				<RoomManager rooms={this.state.rooms} addRoom={this.addRoom} removeRoom={this.removeRoom}/>
				<Scheduler rooms={this.state.rooms} makeReservation={this.makeReservation} removeReservation={this.removeReservation} httpRequest={this.httpRequest}/>
			</div>
		);
	}
}

export default App;