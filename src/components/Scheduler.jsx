import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import RoomList from './RoomList.jsx';

class Scheduler extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="scheduler-container">
				<h3>Scheduler</h3>
				<RoomList rooms={this.props.rooms} removeRoom={this.props.removeRoom} />
			</div>
		);
	}
}

export default Scheduler;