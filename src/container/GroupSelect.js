import GroupSelect from './../components/GroupSelect';
import { connect } from 'react-redux';
import { pathToJS, dataToJS, firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { operations } from './../state/ducks/app';

export default connect(
    ({ firebase }) => {
        const groups = dataToJS(firebase, '/groups');
        const auth = pathToJS(firebase, 'auth');
        return {
            groups: groups || {},
            uid: (!isLoaded(auth) || isEmpty(auth)) ? null : auth.uid
        };
    },
    (dispatch) => ({
        onSelect: (id) => dispatch(operations.selectGroup(id))
    })
)(firebaseConnect([ '/groups', 'auth' ])(GroupSelect));