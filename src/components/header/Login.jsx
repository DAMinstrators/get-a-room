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
      <div className={'container'}>
          <div id="" className="">
                <TextField
                 hintText="Username"
                 floatingLabelText="Username"
                 id="username"
                 onChange = {(input) => this.props.usernameChange(input)}     
               />
              <TextField
                 hintText="Password"
                 floatingLabelText="Password"
                 id="password"
                 onChange = {(input) => this.props.passwordChange(input)}            
                />  
            <RaisedButton onClick={this.props.login} secondary={true} id="loginbtn" label="Login" style={{display:'inline-block', 'margin-left':10+'px', 'margin-right':10+'px', 'margin-top':5+'px'}} />
            <RaisedButton onClick={this.props.registerSubmit} id="createuserbtn" label="Register"  style={{display:'inline-block', float:'right'}}/>
          </div>
          <div id="err">{this.props.loginErr}</div>
        
        <center><div id="createsuccess">{this.props.createSuccess}</div></center>
      </div>
        
    );
  }
}