import React from 'react';


export default class CreateOrganization extends React.Component {

  render() {
    return (
      <div id="container" className="app-container">
        <div id="adminfield">
          Create Building Page
          <input id='buildingName' placeholder='Name of Building'>Building</input>
          <input id='nameOfRoom' placeholder='Add a Room!'></input>
          <input id='roomCap' placeholder='Room capacity'></input>
          <button id="submit" onClick={this.props.submitCreateOrg}>Submit</button>
        </div>
      </div>

    );
  }
}
