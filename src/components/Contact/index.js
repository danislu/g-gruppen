import { connect } from 'react-redux';
import { pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { Settings as WrappedComponent } from './Settings';
import { opertions } from './../../state/ducks/settings';

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
        onSubmit: (data) => dispatch(opertions.saveSettings(JSON.parse(JSON.stringify(data))))
    })
)(WrappedComponent);