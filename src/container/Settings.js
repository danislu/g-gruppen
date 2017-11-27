import React from 'react';
import { connect } from 'react-redux';
import { pathToJS, isLoaded, isEmpty, dataToJS, firebaseConnect } from 'react-redux-firebase';
import { Settings as WrappedComponent } from './../components/Settings';
import { opertions } from './../state/ducks/settings';

const createInitialValues = (profile) => {
    if (!isLoaded(profile) || isEmpty(profile)){
        return null;
    }
    
    const { displayName, email, phone, child } = profile;
    return { 
        displayName,
        email,
        phone,
        child
    };
};

export const Settings = connect(
    ({ firebase }) => {
        const profile = pathToJS(firebase, 'profile');    
        return {
            initialValues: createInitialValues(profile)
        };        
    },
    (dispatch) => ({
        onSubmit: (data) => dispatch(opertions.saveSettings(JSON.parse(JSON.stringify(data))))
    })
)(WrappedComponent);