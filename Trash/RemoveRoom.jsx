import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class RemoveRoom extends Component {
	constructor(props) {
		super(props);
	}

	handleRemoveRoom = () =>{
		this.props.removeRoom(this.props.roomIndex);
	}

	render() {
		return (
			<button onClick={this.handleRemoveRoom}>Remove Room</button>
		);
	}
}

export default RemoveRoom;