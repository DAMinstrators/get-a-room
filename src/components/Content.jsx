import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import CreateOrganization from './CreateOrganization.jsx';
import RoomManager from './RoomManager.jsx';
import Scheduler from './Scheduler.jsx';
import BuildingSelector from './BuildingSelector.jsx';
import TimeSelector from './TimeSelector.jsx';
import RoomSelector from './RoomSelector.jsx';
import SelectDate from './SelectDate.jsx';

class Content extends Component {
  constructor(props) {
		super(props);
		this.state = {
			buildings:[],
			selectedBuilding: undefined,
			rooms:[],
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
  }


	// Load all BUILDINGS and initialize selected to 1st element
	loadBuildings = () => {
	  return $.get("/buildings", (data) => {
			 this.setState({buildings: data, selectedBuilding:data[0].name})
			 console.log("Building Data", data)
			 this.loadRooms(this.state.selectedBuilding)
	  })
	}

  // FIXME -- ROOM LOAD ON SELECTION IS ALWAYS OFF BY ONE STATE
	selectBuilding = (event, index, value) => {
		this.setState({selectedBuilding: value})
		this.loadRooms(value)
  };


	// Load all ROOMS and initialize selected to 1st element
	loadRooms = (building) => {
		let url = "/buildings/" + this.state.selectedBuilding;
		return $.get(url, (data) => {
			 this.setState({rooms: data.rooms, selectedRoom:data.rooms[0].name})
			 console.log("my room data is:", data.rooms)
	  })
	}

  selectRoom = (event, index, value) => {
		this.setState({selectedRoom: value})
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
				<CreateOrganization submitCreateOrg={this.submitCreateOrg} />
				<RoomManager rooms={this.props.rooms} addRoom={this.addRoom} removeRoom={this.removeRoom}/>
				<Scheduler rooms={this.props.rooms} makeReservation={this.makeReservation} removeReservation={this.removeReservation} httpRequest={this.httpRequest}/>
			</div>
		)
 }
}	

export default Content;