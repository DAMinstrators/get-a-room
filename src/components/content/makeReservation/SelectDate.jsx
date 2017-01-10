import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * Inline Date Pickers are displayed below the input, rather than as a modal dialog.
 */
let curr = new Date();
const SelectDate = (props) => {

 return( 
  <div>
    <DatePicker hintText="Select Date" defaultDate={curr} container="inline" onChange={props.handleChange} />
  </div>
);
}

export default SelectDate;