import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx';
import Header from './Header.jsx';
import Content from './Content.jsx';
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



  //takes you back to login page, resets all the information in the fields
  reset = (event) =>  {
	  this.setState({loggedIn: false});
	  this.setState({loginErr: ''});
	  this.setState({createErr: ''});
	  this.setState({requestToCreate: 'loginpage'});
	  this.setState({createSuccess: ''});

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
							username="test"
							password="test"
							loggedIn="true"
							submitCreateOrg={this.submitCreateOrg}
							submitCreateUser={this.submitCreateUser}
				 			createdUsername={this.createdUsername}
							createdPassword={this.createdPassword}
							createdGithub={this.createdGithub}
							reset={this.reset}
							createErr={this.state.createErr}
						/>

						<Content 
					  	rooms={this.state.rooms} 
						/>
					</div>
				);
			//if you're not logged in, and they clicked on the create organization button
			} 

		//if you log in successfully, shermans part
		} else {
			return (
				<div>
					<center><button id="logout" onClick={this.reset}>Logout</button></center>
					<RoomManager rooms={this.state.rooms} addRoom={this.addRoom} removeRoom={this.removeRoom}/>
					<Scheduler username={this.state.username} rooms={this.state.rooms} makeReservation={this.makeReservation} removeReservation={this.removeReservation} httpRequest={this.httpRequest}/>
				</div>
			);
		}
	}
}
export default App;
