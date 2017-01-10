import React from 'react';


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
          {'Create Building Page'}
          <input id='buildingName' placeholder='Name of Building' onChange={(e) => {this.buildingChange(e)}}/>
          <input id='roomName' placeholder='Add Rooms' onChange={(e) => {this.roomAdd(e)}}/>
          <button id="submit" onClick={this.submitCreateOrg}>{'Submit'}</button>
        </div>
      </div>

    );
  }
}
