import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class DateSelector extends Component {
	constructor(props) {
		super(props);

		this.handleSelectDate = this.handleSelectDate.bind(this);
	}

	handleSelectDate(event) {
		this.props.selectDate(event.target.value);
	}

	render() {
		return (
			<div className="selector-container">
				<h3>Reservation Date</h3>
				<input type="text" placeholder="Ex. 2016-11-19" onChange={this.handleSelectDate}/>
			</div>
		);
	}
}

export default DateSelector;