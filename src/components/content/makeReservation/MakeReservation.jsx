import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import BuildingSelector from './../BuildingSelector.jsx';
import TimeSelector from './TimeSelector.jsx';
import RoomSelector from './RoomSelector.jsx';
import SelectDate from './SelectDate.jsx';

class MakeReservation extends Component {
  constructor(props) {
		super(props);
		this.state = {
			buildings: [],
			selectedBuilding: undefined,
			rooms: [],
			selectedRoom: undefined
		}

	}

 submitCreateOrg = () =>  {
		console.log('create org button clicked')
	  this.setState({requestToCreate: 'loginpage'});

	  this.setState({loginErr: ''});
	  this.setState({createSuccess: ''});
	}

  componentDidMount() {
		this.loadBuildings()
		this.loadRooms()
  }


	// Load all BUILDINGS and initialize selected to 1st element
	loadBuildings = () => {
	  return $.get("/buildings", (data) => {
			this.state.buildings = data;
			this.state.selectedBuilding = data[0].name;
			 console.log("Building Data", data)
			 this.loadRooms(this.state.selectedBuilding)
	  })
	}

  // FIXME -- ROOM LOAD ON SELECTION IS ALWAYS OFF BY ONE STATE
	selectBuilding = (event, index, value) => {
		this.state.selectedBuilding = value;
		this.loadRooms(value)
  };


	// Load all ROOMS and initialize selected to 1st element
	loadRooms = (building) => {
		let url = "/buildings/" + this.state.selectedBuilding;
		return $.get(url, (data) => {
			this.state.rooms = data.rooms;
			this.state.selectedRoom = data.rooms[0].name;
			this.forceUpdate();
			 console.log("my room data is:", data.rooms)
	  })
	}

  selectRoom = (event, index, value) => {
		this.state.selectedRoom = value;
  };


 render() {
    return (

			<div className={'container'}>
				<div>
					<div id="actionRow">
						<div id="actionBuilding"><BuildingSelector buildings={this.state.buildings} selectedBuilding={this.state.selectedBuilding} handleChange={this.selectBuilding} loadRooms={this.loadRooms}/></div>
						<div id="actionDate"><SelectDate /></div>
						<div id="actionReservationTitle">Reservations</div>
					</div>	
					<div id="actionRow">
				    <div id="actionRooms"><RoomSelector rooms={this.state.rooms} selectedRoom={this.state.selectedRoom} handleChange={this.selectRoom}/></div>
						<div id="actionTime"><TimeSelector /></div>
						<div id="actionReservation">show reservations</div>
					</div>	
				</div>	
			</div>
		)
 }
}	

export default MakeReservation;