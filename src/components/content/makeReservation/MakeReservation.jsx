import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import BuildingSelector from './../BuildingSelector.jsx';
import TimeSelector from './TimeSelector.jsx';
import RoomSelector from './RoomSelector.jsx';
import SelectDate from './SelectDate.jsx';
import ReservationList from './ReservationList.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class MakeReservation extends Component {
  constructor(props) {
		super(props);
		this.state = {
			buildings:[],
			selectedBuilding: undefined,
			rooms:[],
			selectedRoom: undefined,
			selectedDate: undefined,
			reservations: [],
			selectedEndTime: undefined,
			selectedStartTime: undefined,
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
		let url = "/buildings/" + this.state.selectedBuilding;
		return $.get(url, (data) => {
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

selectStart = (event, index, value) => {
		this.setState({selectedStartTime: value})
};

selectEnd = (event, index, value) => {
		this.setState({selectedEndTime: value})
};

selectDate = (x,d) => {
  let formatDate =  d.getFullYear() + "-" + d.getMonth()+1 + "-" + d.getDate()
	this.setState({selectedDate: formatDate})
};

submitRes = () => {
	// Just getting AM PM from start and end time
	let first =  (this.state.selectedStartTime < 12)  ? "AM" : "PM";
	let second =  (this.state.selectedEndTime < 12)  ? "AM" : "PM";

	let res = {
		"building": this.state.selectedBuilding,
    "room": this.state.selectedRoom,
    "date": this.state.selectedDate,
    "start": this.state.selectedStartTime,
    "end": this.state.selectedEndTime,
    "description": "A meeting from " + this.state.selectedStartTime + ":00"+ first + " to " + this.state.selectedEndTime + ":00"+second
  }
	console.log(res)
	$.post("/reservation/", res).then(this.loadReservations(this.state.selectBuilding, this.state.selectedDate, this.state.selectedRoom))
}

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
						<div id="actionTime"><TimeSelector floatingLabel="start time" handleChange={this.selectStart} selectedTime={this.state.selectedStartTime}/></div>
						<div id="actionTime"><TimeSelector floatingLabel="end time" handleChange={this.selectEnd} selectedStartTime={this.state.selectedStartTime} selectedTime={this.state.selectedEndTime}/></div>

					</div>
					<RaisedButton onClick={this.submitRes} id="subRes" label="Submit Reservation"  style={{display:'inline-block', float:'right'}}/>
				</div>	
			</div>
		)
 }
}	

export default MakeReservation;