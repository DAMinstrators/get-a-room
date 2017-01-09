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
    value: 9,
  };

  handleChange = (event, index, value) => this.setState({value});
  handleChange2 = (event, index, value) => this.setState({value});

  render() {
    let times = [{value:9, primaryText:"9:00AM"},
                 {value:10, primaryText:"10:00AM"},
                 {value:11, primaryText:"11:00AM"},
                 {value:12, primaryText:"12:00PM"},
                 {value:13, primaryText:"1:00PM"},
                 {value:14, primaryText:"2:00PM"},
                 {value:15, primaryText:"3:00PM"},
                 {value:16, primaryText:"4:00PM"},
                 {value:17, primaryText:"5:00PM"},
                 {value:18, primaryText:"6:00PM"},
                 {value:19, primaryText:"7:00PM"},
                 {value:20, primaryText:"8:00PM"},
                 {value:21, primaryText:"9:00PM"}]
      let timeList = times.map((tObj) => {
        return <MenuItem value={tObj.value} primaryText={tObj.primaryText} />
      })
    return (
    
      <div>
        <SelectField
          floatingLabelText="Start Time"
          value={9}
          onChange={this.handleChange}
          style={{float:'left'}}
        >
          {timeList}
        </SelectField>
    
      </div>
    )
  }
};