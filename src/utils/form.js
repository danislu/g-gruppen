import React from 'react';
import {
  TextField,
  Checkbox,
  TimePicker,
  MenuItem,
  SelectField
} from 'material-ui';

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

export const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
);

export const renderTimePicker = ({ input, label, ...custom }) => (
  <TimePicker
    format="24hr"
    hintText={label}
    value={new Date(input.value)}
    onChange={date => input.onChange(date.toString())}
    autoOk={true}
    {...input}
    {...custom}
  />
);

export const renderSelect = ({ input, items }) => (
  <SelectField
    value={input.value}
    onChange={(event, index, value) => input.onChange(value)}
    maxHeight={200}
  >
    {items.map((value, idx) => (
      <MenuItem value={value} key={`${value}-${idx}`} primaryText={value} />
    ))}
  </SelectField>
);
