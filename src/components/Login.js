import React from 'react';

export default class Login extends React.Component {
    constructor() {
        super();
        this.handleOnLogin = this.handleOnLogin.bind(this);
    }
    handleOnLogin() {
        this.refs.username.value = '';
        this.refs.password.value = '';
        this.props.login();
    }
  render() {
    return (
      <div>
      <div id="container" className="app-container">
        <div id="adminfield" className="admin-field">
          <div id="containertitle" className="container-title">Log in</div>
           
          <div id="forms" className="forms">
            <div>Username: <input id="username" ref="username" onChange={this.props.username} className="username"></input></div>
            <div>Password: <input type="password" id="password" ref="password" onChange={this.props.password} className="password"></input></div> 
          </div>

          <button onClick={this.handleOnLogin} id="loginbtn">Login</button>
          <div id="err">{this.props.loginErr}</div>
          
        </div>
        
        <div id="create" className="create"> 

          <div id="containertitle" className="container-title">New User?</div>
          <div id="buttons">
            <button onClick={this.props.createOrg} id="createorgbtn">Create a new Organization</button>
            <button onClick={this.props.createUser} id="createuserbtn">Create a new User</button>
          </div>

        </div>
        
        </div>
        <center><div id="createsuccess">{this.props.createSuccess}</div></center>
        </div>
    );
  }
}