import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import AddRoomPanel from './AddRoomPanel.jsx';
import RoomList from './RoomList.jsx';

class RoomManager extends Component {
	render() {
		return (
			<div className="room-manager">
				<AddRoomPanel rooms={this.props.rooms} addRoom={this.props.addRoom} />
				<RoomList rooms={this.props.rooms} removeRoom={this.props.removeRoom} mode="edit"/>
			</div>
		);
	}
}

export default RoomManager;