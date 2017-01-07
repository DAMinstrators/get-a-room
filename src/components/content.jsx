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

 render() {
    return (
			<div>
				 <CreateOrganization submitCreateOrg={this.submitCreateOrg}/>
			</div>
		)
 }
}	

export default Content;