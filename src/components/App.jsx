import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx';
import Header from './Header.jsx';
import CreateOrganization from './CreateOrganization.jsx';
import CreateUser from './CreateUser.jsx';
import RoomManager from './RoomManager.jsx';
import Scheduler from './Scheduler.jsx';

class App extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			createdUsername: '',
			createdPassword: '',
			createdGithub: '',
			createErr: '',
			createSuccess: '',
			loggedIn: false,
			loginErr: '',
			requestToCreate: 'loginpage',
      rooms: [],
			scheduler: {
				selectedRoomIndex: "",
				reservations: {}
			}
		}

	}

	//indicates user clicked on create new org button
	createOrg = () => {
		this.setState({requestToCreate: 'orgpage'});
	}

	//indicates user clicked on create new user button
	createUser = () => {
		this.setState({requestToCreate: 'userpage'});
	}

	//checks to see if username and password are correct


  //user clicked on submit button after creating an org
  submitCreateOrg = () =>  {
	  this.setState({requestToCreate: 'loginpage'});

	  this.setState({loginErr: ''});
	  this.setState({createSuccess: ''});
  }

 



  //takes you back to login page, resets all the information in the fields
  reset = (event) =>  {
	  this.setState({loggedIn: false});
	  this.setState({loginErr: ''});
	  this.setState({createErr: ''});
	  this.setState({requestToCreate: 'loginpage'});
	  this.setState({createSuccess: ''});

  }

    addRoom = (name, capacity) =>  {
		if (name) {
			const rooms = this.state.rooms.slice();
			rooms.push({name: name, capacity: capacity});
			this.setState({rooms: rooms});

			const data = "name=" + name + "&capacity=" + capacity + "&accessGroupId=1";//UPDATE: accessGroupId to be dynamic
			this.httpRequest("post", "/room", data, (result) => {
				console.log("Room added!");
			});
		}
	}

	removeRoom = (roomIndex) => {
		const rooms = this.state.rooms.slice(0, roomIndex).concat(this.state.rooms.slice(roomIndex + 1));
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
		//if you're not logged in, render the login page
		if (!this.state.loggedIn) {
			//defaults to rendering the login page, unless they click on one of the buttons
			if (this.state.requestToCreate === 'loginpage') {
				return (
					<div>
						<Header 
							loginErr={this.state.loginErr}
							createOrg={this.createOrg}
							createUser={this.createUser}
							createSuccess={this.state.createSuccess}
							username={this.state.username}
							password={this.state.password}
							loggedIn={this.state.loggedIn}
							submitCreateOrg={this.submitCreateOrg}
							submitCreateUser={this.submitCreateUser}
				 			createdUsername={this.createdUsername}
							createdPassword={this.createdPassword}
							createdGithub={this.createdGithub}
							reset={this.reset}
							createErr={this.state.createErr}
						/>
					</div>
				);
			//if you're not logged in, and they clicked on the create organization button
			} if (this.state.requestToCreate === 'orgpage') {

				return (
				 <CreateOrganization submitCreateOrg={this.submitCreateOrg}/>
				);
			//if you're not logged in, and they clicked on the create user button
			} if (this.state.requestToCreate === 'userpage') {

				return (
				 <CreateUser submitCreateUser={this.submitCreateUser}
				 			 createdUsername={this.createdUsername}
							 createdPassword={this.createdPassword}
							 createdGithub={this.createdGithub}
							 reset={this.reset}
							 createErr={this.state.createErr}


				 				/>
				);
			}
		//if you log in successfully, shermans part
		} else {
			return (
				<div>
					<center><button id="logout" onClick={this.reset}>Logout</button></center>
					<RoomManager rooms={this.state.rooms} addRoom={this.addRoom} removeRoom={this.removeRoom}/>
				  <Scheduler rooms={this.state.rooms} makeReservation={this.makeReservation} removeReservation={this.removeReservation} httpRequest={this.httpRequest}/>
				</div>
			);
		}
	}
}
export default App;
