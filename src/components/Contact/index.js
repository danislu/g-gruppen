import { connect } from 'react-redux';
import { pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { Settings as WrappedComponent } from './Settings';
import { opertions as settingsOps } from './../../state/ducks/settings';
import { opertions as loginOps } from './../../state/ducks/login';

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

export default connect(
    ({ firebase }) => {
        const profile = pathToJS(firebase, 'profile');    
        return {
            initialValues: createInitialValues(profile)
        };        
    },
    (dispatch) => ({
        onSubmit: (data) => dispatch(settingsOps.saveSettings(JSON.parse(JSON.stringify(data)))),
        onLogout: () => dispatch(loginOps.logOut())
    })
)(WrappedComponent);