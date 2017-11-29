import React from 'react';
import { TextField, Checkbox, TimePicker } from 'material-ui';

export const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) =>
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  
export const renderCheckbox = ({ input, label }) =>
    <Checkbox
      label={label}
      checked={input.value ? true : false}
      onCheck={input.onChange}
    />
  
export const renderTimePicker = ({ input, label, ...custom}) =>
    <TimePicker
      format="24hr"
      hintText={label}
      value={new Date(input.value)}
      onChange={date => input.onChange(date.toString())}
      {...input}
      {...custom}
  />