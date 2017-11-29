import React from 'react';
import { connect } from 'react-redux';
import { pathToJS, isLoaded, isEmpty, dataToJS, firebaseConnect } from 'react-redux-firebase';
import GroupCreate from './../components/GroupCreate';
import { operations } from './../state/ducks/days';

const createInitialValues = () => {
    return { 
        name: new Date().getTime(),
        description: 'beskrivelse',
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
        inviteOnly: true,
        time: new Date()
    };
};

export default connect(
    ({ firebase }) => ({
            initialValues: createInitialValues()
    }),
    (dispatch) => ({
        onSubmit: (data) => dispatch(operations.createGroup(data))
    })
)(GroupCreate);