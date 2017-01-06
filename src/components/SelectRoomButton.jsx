import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class SelectRoomButton extends Component {
	constructor(props) {
		super(props);
		
		this.handleSelectRoomButton = this.handleSelectRoomButton.bind(this);
	}

	handleSelectRoomButton(event) {
		//Todo: make sure to remove room from rooms table as well as any reservations associated with that room from the reservations table
		event.preventDefault();
		this.props.selectRoom(this.props.roomIndex);
	}

	render() {
		let capacity = parseInt(this.props.capacity, 10);
		if (!capacity) {
			capacity = "";
		}
		return (
			<a href="#" onClick={this.handleSelectRoomButton}>
				<span>{this.props.name}</span><br/>
				<span>{capacity}</span>
			</a>
		);
	}
}

export default SelectRoomButton;