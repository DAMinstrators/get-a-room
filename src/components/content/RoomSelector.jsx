import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import SelectRoomButton from './SelectRoomButton.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};

/**
 * `SelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
export default class RoomSelector extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Rooms"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="React" />
          <MenuItem value={2} primaryText="Sails" />
          <MenuItem value={3} primaryText="Express" />
        </SelectField>
      </div>
    )
  }
};
// class RoomSelector extends Component {
// 	constructor(props) {
// 		super(props);
// 	}

// 	handleSelectRoom = (roomIndex) => {
// 		this.props.selectRoom(roomIndex);
// 	}

// 	render() {
// 		console.log(this.props.rooms);
// 		let roomsList = this.props.rooms.map( (room, i) => {
// 			let selected = "";
// 			if (i === this.props.selectedRoomIndex) {
// 				selected = "selected";
// 			}

// 			return (
// 				<li key={i} className={selected}>
// 					<SelectRoomButton roomIndex={i} name={room.name} capacity={room.capacity} selectRoom={this.handleSelectRoom} />
// 				</li>
// 			);
// 		});

// 		if (this.props.selectedDate && !this.props.rooms.length) {
// 			return <li className="no-rooms">No rooms available for this organization. Please add a room.</li>;
// 		}

// 		if (this.props.selectedDate) {
// 			return (
// 				<div className="selector-container">
// 					<h3>Select a Room</h3>
// 					<ul className="room-selector clear">
// 						{roomsList}
// 					</ul>
// 				</div>
// 			);
// 		} else {
// 			return null;
// 		}
		
// 	}
// }

// export default RoomSelector;