import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class CreateOrganization extends React.Component {


buildingChange = (e) => {
  const state = {};
  state.buildingName = e.target.value;
  this.setState({buildingChange: state.buildingName})

}

roomAdd = (e) => {
  const state = {};
  state.addRoom = e.target.value;
  this.setState({addRoom: state.addRoom})

}

submitCreateOrg = () =>  {
  $.post('/building', {name: $('#buildingName').val(), rooms: $('#roomName').val()})
 }

  render() {

    return (
      <div id="container" className="app-container">
        <div id="adminfield">
          <div className="pageHeader">Create Building</div>
              <TextField
                 hintText="Building Name"
                 floatingLabelText="Building Name"
                 id="buildingName"
                 onChange = {(e) => {this.buildingChange(e)}}
               />
              <TextField
                 hintText="Add Rooms"
                 floatingLabelText="Add Rooms"
                 id="roomName"
                 onChange = {(e) => {this.roomAdd(e)}}     
               />
             <RaisedButton onClick={this.submitCreateOrg} secondary={true} id="createBuildingButton" label="Create Building" style={{display:'inline-block', 'marginTop':5+'px', marginLeft:20 + 'px'}} />
        </div>
      </div>

    );
  }
}
