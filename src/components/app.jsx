import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import CreateOrganization from './CreateOrganization';
import CreateUser from './CreateUser';

class App extends Component {
	constructor() {
		super();
		this.state = {
			accounts: {mike: 'pass', anto: 'hello', dhani: 'dbman'},
			username: '',
			password: '',
			createdUsername: '',
			createdPassword: '',
			createdGithub: '',
			createErr: '',
			loggedIn: false,
			loginErr: '',
			user: '',
			auth: '',
			requestToCreate: 0,
		}
		this.usernameChange = this.usernameChange.bind(this);
    	this.passwordChange = this.passwordChange.bind(this);
		this.myAuth = this.myAuth.bind(this);
		this.createOrg = this.createOrg.bind(this);
		this.createUser = this.createUser.bind(this);
		this.submitCreateOrg = this.submitCreateOrg.bind(this);
		this.createdUsername = this.createdUsername.bind(this);
		this.createdPassword = this.createdPassword.bind(this);
		this.createdGithub = this.createdGithub.bind(this);
		this.submitCreateUser = this.submitCreateUser.bind(this);
		this.reset = this.reset.bind(this);
		
	}

	//listens to changes to the username field on login page
	usernameChange(event) {
		this.setState({username: event.target.value})
		console.log(this.state.username);
		this.setState({loginErr: ''});
	}

	//listens to changes to the password field on login page
	passwordChange(event) {
		this.setState({password: event.target.value})
		console.log(this.state.password);
		this.setState({loginErr: ''});
	}

	//indicates user clicked on create new org button
	createOrg() {
		this.setState({requestToCreate: 1});
	}

	//indicates user clicked on create new user button
	createUser() {
		this.setState({requestToCreate: 2});
	}

	//checks to see if username and password are correct
	myAuth() {

		//check if they filled out both fields
		if (this.state.username === '' || this.state.password === '') {
		  this.setState({loginErr: "Please fill out all fields"})
		  return;
	  	}
		
		//if they filled it out, format username and password string to send in post request
		let loginString='username=' + this.state.username + "&" + 
	  			 'password=' + this.state.password;
		this.setState({auth: loginString});
		console.log(loginString)

		//post request to see if username and password are correct
		var http = new XMLHttpRequest();
		var url = "localhost:8080/user/validate";
		var params = this.state.auth;
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		//Call a function when the state changes.
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				//alert(http.responseText);
			}
		}
		http.send(params);



	
	if(this.state.accounts[this.state.username]) {
      if (this.state.accounts[this.state.username] === this.state.password) {
        this.setState({loggedIn: true});
        this.setState({loginErr: ''});
        this.setState({username: ''});
        this.setState({password: ''});
		
		console.log('valid login');
      } else {
        this.setState({loginErr:'Wrong Password!'});
      }

    } else {
      this.setState({loginErr:'Account name doesn\'t exist!'});
    }

  }
  
  //user clicked on submit button after creating an org
  submitCreateOrg() {
	  this.setState({requestToCreate: 0});

	  this.setState({loginErr: ''});
  }

  //stores the username being typed into the create user page's "username" field into state
  createdUsername(event) {
	  this.setState({createdUsername: event.target.value})
	  this.setState({createErr: ''});
  }
  
  //stores the password being typed into the create user page's "password" field into state
  createdPassword(event) {
	  this.setState({createdPassword: event.target.value})
	  this.setState({createErr: ''});
  }

  //stores the github handle being typed into the create user page's "github handle" field into state
  createdGithub(event) {
	  this.setState({createdGithub: event.target.value})
	  this.setState({createErr: ''});
  }

  //onclick when user clicks on submit button (user creation)
  submitCreateUser() {
	  console.log('username is ' + this.state.createdUsername)
	  console.log('password is ' + this.state.createdPassword)
	  console.log('github is ' + this.state.createdGithub)

	  //check to make sure all fields are filled on user creation page
	  if (this.state.createdUsername === '' || this.state.createdPassword === '' || this.state.createdGithub === '') {
		  this.setState({createErr: "Please fill out all fields"})
		  return;
	  }
	  
	  //if they are all filled properly, format string for post request
	  let userString='username=' + this.state.createdUsername + "&" + 
	  			 'password=' + this.state.createdPassword + "&" +
				 'github=' + this.state.createdGithub;

	    this.setState({user: userString})
		
		//reset the username and password so you can create another one if you want to
		this.setState({createdUsername: ''});
	  	this.setState({createdPassword: ''});
	  	this.setState({createdGithub: ''});
		
		console.log(userString);
	    var http = new XMLHttpRequest();
		var url = "localhost:8080/user/create";
		var params = this.state.user;
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		//Call a function when the state changes.
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				//alert(http.responseText);
			}
		}
		http.send(params);

	  this.setState({requestToCreate: 0});

	  this.setState({loginErr: ''});
	  console.log(this.state.user);
  }

  //takes you back to login page, resets all the information in the fields
  reset() {
	  
	  this.setState({loginErr: ''});
	  this.setState({createErr: ''});
	  this.setState({requestToCreate: 0});
	  this.setState({createdUsername: ''});
	  this.setState({createdPassword: ''});
	  this.setState({createdGithub: ''});

  }

	render() {
		//if you're not logged in, render the login page
		if (!this.state.loggedIn) {
			//defaults to rendering the login page, unless they click on one of the buttons
			if (this.state.requestToCreate === 0) {
				return (
					<div>
						<Login username={this.usernameChange}
							password={this.passwordChange}
							loginErr={this.state.loginErr}
							login={this.myAuth}
							createOrg={this.createOrg}
							createUser={this.createUser}
							
							/>
					</div>
				);
			//if you're not logged in, and they clicked on the create organization button
			} if (this.state.requestToCreate === 1) {
				
				return (
				 <CreateOrganization submitCreateOrg={this.submitCreateOrg}/>
				);
			//if you're not logged in, and they clicked on the create user button
			} if (this.state.requestToCreate === 2) {
				
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
		//if you log in successfully, sherman's part
		} else {
			return (
				<div>
					<h1>ShermanCode</h1>
				</div>
			);
		}
	}
}

export default App;