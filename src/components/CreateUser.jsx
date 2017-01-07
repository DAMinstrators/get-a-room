import React from 'react';


export default class CreateUser extends React.Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e){
      if(e.key === 'Enter') {
        this.props.submitCreateUser();
      }
    }
    
  render() {
    return (
      <div id="container" className="app-container">
        <div id="createfields">
            <div id="forms">
            <center><div id="containertitle">Create User Page</div></center>
            
            <div>Username: <input id="username" ref="username" onChange={this.props.createdUsername} onKeyPress={this.handleKeyPress} className="username"></input></div>
            <div>Password: <input type="password" id="password" ref="password" onChange={this.props.createdPassword} onKeyPress={this.handleKeyPress} className="password"></input></div>
            <div>Github Handle: <input id="githubhandle" ref="githubhandle" onChange={this.props.createdGithub} onKeyPress={this.handleKeyPress} className="githubhandle"></input></div>
            
            </div>
        <div id="err">{this.props.createErr}</div>
        
        <button id="submit" onClick={this.props.submitCreateUser}>Submit</button>
        <button id="reset" onClick={this.props.reset}>Return to Login</button>
        
        </div>
        
        
      </div>
        
    );
  }
}