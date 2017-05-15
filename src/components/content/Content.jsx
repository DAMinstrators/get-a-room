import React, { Component} from 'react';
import ReactDOM from 'react-dom';

import MakeReservation from './makeReservation/MakeReservation.jsx';
import CreateBuilding from './createBuilding/CreateBuilding.jsx';
import JoinBuilding from './joinBuilding/JoinBuilding.jsx';

class Content extends Component {
  constructor(props) {

		super(props);

	}



 render() {
    return (
			<div className={'container'}>
				<div>

					<MakeReservation  />
					<CreateBuilding submitCreateOrg={this.submitCreateOrg} />
					<JoinBuilding />
				</div>

			</div>
		)

  }
}

export default Content;
