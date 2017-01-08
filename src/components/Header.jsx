import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx';
import CreateUser from './CreateUser.jsx';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
); 

// const LoggedOut = () => (<Login username={this.usernameChange}
// 							password={this.passwordChange}
// 							loginErr={this.state.loginErr}
// 							login={this.myAuth}
// 							createOrg={this.createOrg}
// 							createUser={this.createUser}
// 							createSuccess={this.state.createSuccess} /> )

Logged.muiName = 'IconMenu';
// LoggedOut.muiName = 'Login';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Header extends Component {
  constructor(props) {
		super(props);

    loggedIn1: true;
		labelPos: "left";
	}

  
	//listens to changes to the username field on login page
	usernameChange = (event) => {
		this.setState({username: event.target.value})
		// console.log(this.state.username);
		this.setState({loginErr: ''});
		this.setState({createSuccess: ''});
	}

	//listens to changes to the password field on login page
	passwordChange = (event) => {
		this.setState({password: event.target.value})
		// console.log(this.state.password);
		this.setState({loginErr: ''});
	    this.setState({createSuccess: ''});
	}
  
	login = () => {

		// check if they filled out both fields
		if (this.username === '' || this.password === '') {
		  this.setState({loginErr: "Please fill out all fields"})
		  return;
	  	}

		//if they filled it out, format username and password string to send in post request
		let loginString='username=' + this.state.username + "&" +
	  			 'password=' + this.state.password;

		console.log(loginString)

		//post request to see if username and password are correct
		var http = new XMLHttpRequest();
		var url = "http://localhost:3000/user/validate";
		var params = loginString;
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		//Call a function when the state changes.
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				console.log(http.responseText);
				if (http.responseText === 'true') {
					console.log('valid login!!!')
					this.setState({loggedIn: true});
					this.setState({loginErr: ''});
					this.setState({username: ''});
					this.setState({password: ''});
					this.loggedIn1 = false;
				} else {
					console.log('in else')
					this.setState({loginErr: 'Invalid login'})
				}
			}
		}.bind(this);
		http.send(params);

        this.setState({loginErr: ''});
        this.setState({username: ''});
        this.setState({password: ''});


  }
  
  createOrg = () => {
    console.log('create button clicked')
		this.setState({requestToCreate: 'orgpage'});
	}

	//indicates user clicked on create new user button
	createUser = () => {
    console.log('create user clicked')
		this.setState({requestToCreate: 'userpage'});
	}

    //onclick when user clicks on submit button (user creation)
  submitCreateUser = () => {


	  //check to make sure all fields are filled on user creation page
	  if (this.createdUsername === '' || this.createdPassword === '' || this.createdGithub === '') {
		  this.setState({createErr: "Please fill out all fields"})
		  return;
	  }

	  //if they are all filled properly, format string for post request
	  let userString = 'username=' + this.state.createdUsername + '&' +
	  			 'password='+ this.state.createdPassword + '&' +
				 'github=' + this.state.createdGithub;

		//reset the username and password so you can create another one if you want to
		this.setState({createdUsername: ''});
	  	this.setState({createdPassword: ''});
	  	this.setState({createdGithub: ''});

		console.log(userString);
	  var http = new XMLHttpRequest();
		var url = "http://localhost:3000/user/create";
		var params = userString;
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		//Call a function when the state changes.
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				 console.log(http.responseText);
				 if (http.responseText === "\"exists\"") {
					this.setState({createSuccess: 'Please use a different username.'});

				} else {
					this.setState({createSuccess: 'Username has been created.'});

				}
			}
		}.bind(this);
		http.send(params);

	  this.setState({requestToCreate: 'loginpage'});

	  this.setState({loginErr: ''});
	  console.log(this.props.createSuccess);
  }

 //stores the username being typed into the create user page's "username" field into state
  createdUsername = (event) => {
	  this.setState({createdUsername: event.target.value})
	  this.setState({createErr: ''});
  }

  //stores the password being typed into the create user page's "password" field into state
  createdPassword = (event) => {
	  this.setState({createdPassword: event.target.value})
	  this.setState({createErr: ''});
  }

  //stores the github handle being typed into the create user page's "github handle" field into state
  createdGithub = (event) => {
	  this.setState({createdGithub: event.target.value})
	  this.setState({createErr: ''});
  }

  handleChange = (event, logged) => {
		this.loggedIn1 = logged;
		this.labelPos = function() {this.loggedIn1 ? "left" : "right"}.bind(this)();
  };

  render() {
    return (
			<div>
        <Toggle
          label="Logged"
          defaultToggled={false}
          onToggle={this.handleChange}
          // labelPosition="right"
          labelPosition={this.labelPos}
          style={{margin: 20}}
        />
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={
            this.loggedIn1 ? <CreateUser 
               submitCreateUser={this.submitCreateUser}
				 			 createdUsername={this.createdUsername}
							 createdPassword={this.createdPassword}
							 createdGithub={this.createdGithub}
							 reset={this.reset}
							 createErr={this.props.createErr}
              /> : <Login usernameChange={this.usernameChange}
							passwordChange={this.passwordChange}
							loginErr={this.loginErr}
							login={this.login}
							createOrg={this.createOrg}
							createUser={this.createUser}
							createSuccess={this.createSuccess} 
							username={this.username} 
							password={this.password} 
							loggedIn={this.loggedIn} 
							createOrg={this.createOrg} 
							createUser={this.createUser}
							handleChange={this.handleChange}	
            />
            }
        />
      </div>
    );
  }
}

export default Header;