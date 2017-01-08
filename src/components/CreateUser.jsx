import React from 'react';


export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
  }

  handleKeyPress = (e) => {
      if(e.key === 'Enter') {
        this.props.submitCreateUser();
      }
    }
    
  render() {
    return (
      <div>
            <div id="containertitle"  style={{display:'inline-block'}}>Register</div>
            <div style={{display:'inline-block'}}>Username: <input id="username" ref="username" onChange={this.props.createdUsername} onKeyPress={this.handleKeyPress} className="username"></input></div>
            <div style={{display:'inline-block'}}>Password: <input type="password" id="password" ref="password" onChange={this.props.createdPassword} onKeyPress={this.handleKeyPress} className="password"></input></div>
            <div  style={{display:'inline-block'}}><button id="submit" onClick={this.props.submitCreateUser} style={{display:'inline-block'}}>Submit</button>
        <button id="reset" onClick={this.props.reset} style={{display:'inline-block'}}>Return to Login</button>   </div>
        <div id="err">{this.props.createErr}</div>
        
             
        
      </div>
        
    );
  }
}