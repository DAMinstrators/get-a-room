import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import CreateOrganization from './CreateOrganization.jsx';

class Content extends Component {
  constructor(props) {
		super(props);

	}

 submitCreateOrg = () =>  {
		console.log('create org button clicked')
	  this.setState({requestToCreate: 'loginpage'});

	  this.setState({loginErr: ''});
	  this.setState({createSuccess: ''});
  }

  addRoom = () => {
    console.log('Room button clicked');
    let roomDiv = <div>
      <input placeholder='Add Room!' />
      <input placeholder='Room Capacity' />
    </div>

    
  }

 render() {
    return (
			<div>
				 <CreateOrganization submitCreateOrg={this.submitCreateOrg} addRoom={this.addRoom}/>

			</div>
		)
 }
}

export default Content;
