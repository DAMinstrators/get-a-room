import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class AddRoomPanel extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			name: "",
			capacity: 0,
			errorMessage: ""
		};

		this.handleRoomEntry = this.handleRoomEntry.bind(this);
		this.addRoom = this.addRoom.bind(this);
	}

	handleRoomEntry(event) {
		const entryUpdate = {};
		entryUpdate[event.target.name] = event.target.value;
		console.log(entryUpdate);
		this.setState(entryUpdate);
	}

	addRoom() {
		if (this.state.name) {
			let unique = true;
			//check to see if room already exists (Rooms must have unique names)
			const currentRooms = Object.keys(this.props.rooms);
			for (let i = 0; i < currentRooms.length; i++) {
				if (this.state.name.toUpperCase() === this.props.rooms[i].name.toUpperCase()) {
					unique = false;
					break;
				}
			}

			if (unique) {
				this.refs.name.value = "";
				this.refs.capacity.value = "";
				this.props.addRoom(this.state.name, this.state.capacity);
				this.setState({name: "", capacity: 0, errorMessage: ""})
			} else {
				this.setState({errorMessage: "\"" + this.state.name + "\" room already exists"});
			}
		} else {
			this.setState({errorMessage: "Please provide a room name."});
		}
	}

	render() {
		let errorMessage = "";
		if (this.state.errorMessage) {
			errorMessage = <div className="error">{ this.state.errorMessage }</div>;
		}
		return (
			<div className="adder-panel">
				<h3>Add New Room</h3>
				{errorMessage}
				<div className="entry-fields">
					<input type="text" name="name" ref="name" placeholder="Enter Room Name" onChange={this.handleRoomEntry}/>
					<input type="text" name="capacity" ref="capacity" placeholder="Enter Room Capacity" onChange={this.handleRoomEntry}/>
				</div>
				<button onClick={this.addRoom}>Add Room</button>
			</div>
		);
	}
}

export default AddRoomPanel;