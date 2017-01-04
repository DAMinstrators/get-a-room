import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import AddRoomPanel from './AddRoomPanel.jsx';

class RoomManager extends Component {
	render() {
		return (
			<div className="room-manager">
				<AddRoomPanel/>
			</div>
		);
	}
}

export default RoomManager;