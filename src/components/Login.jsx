import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Login extends React.Component {

  constructor(props) {
      super(props);
        this.handleOnLogin = this.handleOnLogin.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleOnKey(target) {
      console.log('key pressed')
      console.log(this.refs.username.value)
      if(target.charCode==13){
            alert('Enter clicked!!!');    
      }

    }


    handleOnLogin = () => {
        this.refs.username.value = '';
        this.refs.password.value = '';
        this.props.login();
    }

    handleKeyPress(e){
      if(e.key === 'Enter') {
        this.handleOnLogin();
      }
    }


  render() {
    return (
      <div>
          <div id="forms" className="forms">
            <div style={{display:'inline-block'}}>Username: <input id="username" ref="username" onKeyPress={this.handleKeyPress} onChange={this.props.usernameChange} className="username"></input></div>
            <div style={{display:'inline-block'}}>Password: <input type="password" id="password" onKeyPress={this.handleKeyPress} ref="password" onChange={this.props.passwordChange} className="password"></input></div> 
            <RaisedButton onClick={this.props.login} id="loginbtn" label="Login" style={{display:'inline-block', 'margin-left':10+'px', 'margin-right':10+'px'}} />
            <RaisedButton onClick={this.props.createUser} id="createuserbtn" label="Register"  style={{display:'inline-block'}}/>
          </div>
          <div id="err">{this.props.loginErr}</div>
        
        <center><div id="createsuccess">{this.props.createSuccess}</div></center>
      </div>
        
    );
  }
}