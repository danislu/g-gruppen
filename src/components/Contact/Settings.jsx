import React from 'react';
import { FloatingActionButton, RaisedButton } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './../../utils/form';

const wrapper = {
    marginLeft: 10,
    marginRigth: 10
};
  
const form = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
}

const fabStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20
};
  
const Component = ({ handleSubmit, onLogout }) => (<div style={wrapper}>
    <form onSubmit={ handleSubmit }>
        <div style={form}>
        <h2>Kontaktinfo</h2>
        <Field name="displayName" component={renderTextField} label="Navn" type="text" />
        <Field name="email" component={renderTextField} label="E-post" type="email" />
        <Field name="phone" component={renderTextField} label="Telefon" type="tel" />

        <Field name="child" component={renderTextField} label="Barnets navn" type="text" />

        <RaisedButton onClick={onLogout}>Logout</RaisedButton>
        <FloatingActionButton type="submit" style={fabStyle}>
            <ContentSave />
        </FloatingActionButton>
        </div>
    </form>
</div>);

export const Settings = reduxForm({
    form: 'settings'
})(Component);
