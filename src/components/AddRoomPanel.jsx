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
		this.setState(entryUpdate);
	}

	addRoom() {
		if (this.state.name) {
			this.props.addRoom(this.state.name, this.state.capacity);
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
			<div className="add-room-panel">
				<h3>Add New Room</h3>
				{errorMessage}
				<input type="text" name="name" placeholder="Enter Room Name" onChange={this.handleRoomEntry}/>
				<input type="text" name="capacity" placeholder="Enter Room Capacity" onChange={this.handleRoomEntry}/>
				<button onClick={this.addRoom}>Add Room</button>
			</div>
		);
	}
}

export default AddRoomPanel;