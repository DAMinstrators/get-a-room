import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import CreateOrganization from './CreateOrganization.jsx';
import RoomManager from './RoomManager.jsx';
import Scheduler from './Scheduler.jsx';
import BuildingSelector from './BuildingSelector.jsx';
import TimeSelector from './TimeSelector.jsx';
import RoomSelector from './RoomSelector.jsx';
import SelectDate from './SelectDate.jsx';
import ReservationList from './ReservationList.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class Content extends Component {
  constructor(props) {
		super(props);
		this.state = {
			buildings:[],
			selectedBuilding: undefined,
			rooms:[],
			selectedRoom: undefined,
			selectedDate: undefined,
			reservations: [],
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
		this.setState({selectedBuilding: value}, function(){ 
		  this.loadRooms(value)
		})
	
  };


	// Load all ROOMS and initialize selected to 1st element
	loadRooms = (building) => {
		console.log("this in loadrooms", this)
		let url = "/buildings/" + this.state.selectedBuilding;
		return $.get(url, (data) => {
			 console.log("this in loadrooms ajax", this)
			 this.setState({rooms: data.rooms, selectedRoom:data.rooms[0].name})
			 console.log("my room data is:", data.rooms)
	  })
	}

	loadReservations = (building, date, room) => {
		let url = "/reservations/" + this.state.selectedBuilding + "/?date=" + this.state.selectedDate + "&room=" + this.state.selectedRoom;
		return $.get(url, (data) => {
			this.setState({reservations: data})
			 console.log("my reservation data is:", data)
	  })
	}

  selectRoom = (event, index, value) => {
		this.setState({selectedRoom: value}, function() {
		  this.loadReservations(this.state.selectBuilding, this.state.selectedDate, this.state.selectedRoom)
		})
};

	selectDate = (x,d) => {
		let formatDate =  d.getFullYear() + "-" + d.getMonth()+1 + "-" + d.getDate()
		this.setState({selectedDate: formatDate})
  };


 render() {
    return (

			<div className={'container'}>
				<div>
					<div id="actionRow">
						<div id="actionBuilding"><BuildingSelector buildings={this.state.buildings} selectedBuilding={this.state.selectedBuilding} handleChange={this.selectBuilding} loadRooms={this.loadRooms}/></div>
						<div id="actionDate"><SelectDate handleChange={this.selectDate} /></div>
						<div id="actionReservationTitle"><h3>Reservations</h3><ReservationList reservations={this.state.reservations}/> </div>
					</div>	
					<div id="actionRow">
						<div id="actionRooms"><RoomSelector rooms={this.state.rooms} selectedRoom={this.state.selectedRoom} handleChange={this.selectRoom}/></div>
						<div id="actionTime"><TimeSelector /></div>
						<div id="actionTime"><TimeSelector /></div>

					</div>
					<RaisedButton onClick={this.props.submitRes} id="subRes" label="Submit Reservation"  style={{display:'inline-block', float:'right'}}/>
				</div>	
				<CreateOrganization submitCreateOrg={this.submitCreateOrg} />
				<RoomManager rooms={this.props.rooms} addRoom={this.addRoom} removeRoom={this.removeRoom}/>
				<Scheduler rooms={this.props.rooms} makeReservation={this.makeReservation} removeReservation={this.removeReservation} httpRequest={this.httpRequest}/>
			</div>
		)
 }
}	

export default Content;