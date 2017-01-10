import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import NavLink from './NavLink.jsx';

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
        <div style={{display:'inline-block', marginTop:25 +'px'}} id="userMenu">
          <NavLink to='/createreservation'><RaisedButton id="return" label="Make A Reservation" style={{display:'inline-block', marginLeft:10+'px', marginRight:10+'px'}} /></NavLink>
          <NavLink to='/join'><RaisedButton id="return" label="Join a Building" style={{display:'inline-block', marginLeft:10+'px', marginRight:10+'px'}} /></NavLink>
          <NavLink to='/createbuilding'><RaisedButton id="submit" label="Create a Building" onClick={this.props.submitCreateUser} style={{display:'inline-block', marginLeft:10+'px', marginRight:20+'px', marginTop:5+'px'}} /></NavLink>
          <NavLink to='/'><RaisedButton id="return" label="Logout" onClick={this.props.handleChange} style={{display:'inline-block'}} /></NavLink>
        </div> 
      </div>
    );
  }
}