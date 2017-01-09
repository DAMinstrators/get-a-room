import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class UserMenu extends React.Component {
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
      <div className={'container'}>    
        <div style={{display:'inline-block'}} id="userMenu">
          <RaisedButton id="return" label="Make A Reservation" onClick={this.props.handleChange} style={{display:'inline-block', marginLeft:10+'px', marginRight:10+'px'}} />
          <RaisedButton id="return" label="Join a Building" onClick={this.props.handleChange} style={{display:'inline-block', marginLeft:10+'px', marginRight:10+'px'}} />
          <RaisedButton id="submit" label="Create a Building" onClick={this.props.submitCreateUser} style={{display:'inline-block', marginLeft:10+'px', marginRight:20+'px', marginTop:5+'px'}} />
          <RaisedButton id="return" label="Logout" onClick={this.props.handleChange} style={{display:'inline-block'}} />
        </div> 
      </div>
    );
  }
}