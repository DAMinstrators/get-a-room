import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import CreateOrganization from './CreateOrganization.jsx';
import RoomManager from './RoomManager.jsx';
import Scheduler from './Scheduler.jsx';
import BuildingSelector from './BuildingSelector.jsx';
import TimeSelector from './TimeSelector.jsx';
import RoomSelector from './RoomSelector.jsx';
import SelectDate from './SelectDate.jsx';

class Content extends Component {
  constructor(props) {
		super(props);

	}

 submitCreateOrg = () =>  {
		console.log('create org button clicked')
	  this.setState({requestToCreate: 'loginpage'});

	  this.setState({loginErr: ''});
	  this.setState({createSuccess: ''});
	}
	
	addRoom = (name, capacity) =>  {
		if (name) {
			const rooms = this.props.rooms.slice();
			rooms.push({name: name, capacity: capacity});
			this.setState({rooms: rooms});

			const data = "name=" + name + "&capacity=" + capacity + "&accessGroupId=1";//UPDATE: accessGroupId to be dynamic
			this.httpRequest("post", "/room", data, (result) => {
				console.log("Room added!");
			});
		}
	}

	removeRoom = (roomIndex) => {
		const rooms = this.props.rooms.slice(0, roomIndex).concat(this.props.rooms.slice(roomIndex + 1));
		this.setState({rooms: rooms});
	}

	makeReservation = () => {

	}

	removeReservation = () => {

	}

	httpRequest = (method, url, data, callback) => {
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

			<div className={'container'}>
				<div>
					<div id="actionRow">
						<div id="actionBuilding"><BuildingSelector /></div>
						<div id="actionDate"><SelectDate /></div>
						<div id="actionReservationTitle">Reservations</div>
					</div>	
					<div id="actionRow">
						<div id="actionRooms"><RoomSelector /></div>
						<div id="actionTime"><TimeSelector /></div>
						<div id="actionReservation">show reservations</div>
					</div>	
				</div>	
				<CreateOrganization submitCreateOrg={this.submitCreateOrg} />
				<RoomManager rooms={this.props.rooms} addRoom={this.addRoom} removeRoom={this.removeRoom}/>
				<Scheduler rooms={this.props.rooms} makeReservation={this.makeReservation} removeReservation={this.removeReservation} httpRequest={this.httpRequest}/>
			</div>
		)
 }
}	

export default Content;