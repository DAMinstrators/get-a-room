import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import BuildingSelector from './../BuildingSelector.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class JoinBuilding extends Component {
  constructor(props) {
		super(props);
		this.state = {
			buildings: [],
			selectedBuilding: undefined
		}
	}


  componentDidMount() {
		this.loadBuildings()
  }


	// Load all BUILDINGS and initialize selected to 1st element
	loadBuildings = () => {
	  return $.get("/buildings", (data) => {
			 this.setState({buildings: data, selectedBuilding:data[0].name})
			 console.log("Building Data", data)
	  })
	}

	joinBuilding = () => {
	  return $.get("/buildings", (data) => {
			 this.setState({buildings: data, selectedBuilding:data[0].name})
			 console.log("Building Data", data)
	  })
	}

 render() {
    return (

			<div className={'container'}>
					<div id="actionRow">
					<div id="actionDate">
						<BuildingSelector buildings={this.state.buildings} selectedBuilding={this.state.selectedBuilding} handleChange={this.selectBuilding} loadRooms={this.loadRooms} />
					</div>
						<div id="buildingPassword">              <TextField
                 hintText="Building Password"
                 floatingLabelText="Building Password"
                 id="buildingPassword"           
                />  
            </div>
						<div id="joinBuildingButton">
					<RaisedButton secondary={true} id="joinBuilding" label="Join Building" style={{display:'inline-block'}} />	
					</div>
				</div>
      </div>
      

		)
 }
}	

export default JoinBuilding;