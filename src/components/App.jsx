import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './header/Header.jsx';
import Content from './content/Content.jsx';

class App extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			buildingName: '',
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


  submitCreateOrg = () =>  {
	  this.setState({requestToCreate: 'loginpage'});

	  this.setState({loginErr: ''});
	  this.setState({createSuccess: ''});
  }






  //takes you back to login page, resets all the information in the fields
  reset = (event) =>  {
	  this.setState({loggedIn: true});
	  this.setState({loginErr: ''});
	  this.setState({createErr: ''});
	  this.setState({requestToCreate: 'loginpage'});
	  this.setState({createSuccess: ''});

  }

	render() {
		return (
					<div style={{width:100+'%'}}>
						<Header

							loginErr={this.state.loginErr}
							createOrg={this.createOrg}
							createUser={this.createUser}
							createSuccess={this.state.createSuccess}
							username="test"
							password="test"
							loggedIn={this.state.loggedIn}
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


	}

}
export default App;
