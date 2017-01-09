import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * Inline Date Pickers are displayed below the input, rather than as a modal dialog.
 */
const SelectDate = () => (
  <div>
    <DatePicker hintText="Select Date" container="inline" />
  </div>
);

export default SelectDate;