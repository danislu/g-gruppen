import React from 'react';
import { FloatingActionButton, Divider } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import { Field, reduxForm } from 'redux-form';
import { renderTextField, renderCheckbox, renderTimePicker, renderSelect } from './../utils/form';

const wrapper = {
    marginLeft: 10,
    marginRigth: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
}

const weekdayWrapper = {
    display: 'flex',
    flexDirection: 'column',
};

const fabStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20
};

const Component = ({ handleSubmit }) => (<form onSubmit={ handleSubmit }>
    <div style={wrapper}>
        <h2>Ny gågruppe</h2>
        <Field name="inviteOnly" label="Privat" component={renderCheckbox} />
        <Field name="name" component={renderTextField} label="Navn på gruppen" type="text" />
        <Field name="description" component={renderTextField} label="Beskrivelse" type="text" />

        <Divider />

        <label>Ukedag</label>
        <div style={weekdayWrapper}>
            <Field name="monday" label="Mandag" component={renderCheckbox} />
            <Field name="tuesday" label="Tirsdag" component={renderCheckbox} />
            <Field name="wednesday" label="Onsdag" component={renderCheckbox} />
            <Field name="thursday" label="Torsdag" component={renderCheckbox} />
            <Field name="friday" label="Fredag" component={renderCheckbox} />
            <Field name="saturday" label="Lørdag" component={renderCheckbox} />
            <Field name="sunday" label="Søndag" component={renderCheckbox} />
        </div>

        <Divider />

        <label>Tidspunkt</label>
        <div>
            <Field name="time" label="Tid" component={renderTimePicker} />
        </div>

        <label>Minimum antall</label>
        <div>
            <Field name="requiredCount"  
                component={renderSelect} 
                items={[1,2,3,4,5,6,7,8,9,10]} />
        </div>
        
        <FloatingActionButton type="submit" style={fabStyle}>
            <ContentSave />
        </FloatingActionButton>
    </div>
</form>);

export default reduxForm({
    form: 'creategroup'
})(Component);
