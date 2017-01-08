import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 100,
  },
};

/**
 * `SelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
export default class TimeSelector extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Start Time"
          value={this.state.value}
          onChange={this.handleChange}
          style={{float:'left'}}
        >
          <MenuItem value={1} primaryText="0" />
          <MenuItem value={2} primaryText="1" />
          <MenuItem value={3} primaryText="2" />
        </SelectField>

        <SelectField
          floatingLabelText="End Time"
          value={this.state.value}
          onChange={this.handleChange}
          style={{float:'right'}}

        >
          <MenuItem value={1} primaryText="3" />
          <MenuItem value={2} primaryText="4" />
          <MenuItem value={3} primaryText="5" />
        </SelectField>
      </div>
    )
  }
};