import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class SelectRoomButton extends Component {
	constructor(props) {
		super(props);
		
		this.handleSelectRoomButton = this.handleSelectRoomButton.bind(this);
	}

	handleSelectRoomButton(event) {
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