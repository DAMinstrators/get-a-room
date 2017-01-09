import React from 'react';


export default class CreateOrganization extends React.Component {

  render() {

    return (
      <div id="container" className="app-container">
        <div id="adminfield">
          {'Create Building Page'}
          <input id='buildingName' placeholder='Name of Building' />
          <button id="submit" onClick={this.props.submitCreateOrg}>{'Submit'}</button>
          
        </div>
      </div>

    );
  }
}
