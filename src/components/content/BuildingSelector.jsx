import React, {Component} from 'react';
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
export default class BuildingSelector extends Component {
 
 componentDidUpdate(){
   console.log("I updated");
 }

  render() {
    console.log("propsBuildings", this.props.selectedBuilding)
    // Looping thru buildings to create Menu Items
    let buildings = this.props.buildings.map((bObj, index) => {
       return <MenuItem key={index} value={bObj.name} primaryText={bObj.name} />
    });

    return (
      <div>
        <SelectField
          floatingLabelText="Buildings"
          value={this.props.selectedBuilding}
          onChange={this.props.handleChange}
          children={buildings}
        >
          
        </SelectField>
      </div>
    )
  }
};