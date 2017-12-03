import GroupSelect from './../components/GroupSelect';
import { connect } from 'react-redux';
import { pathToJS, dataToJS, firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

export default withRouter(connect(
    ({ firebase }) => {
        const groups = dataToJS(firebase, '/groups');
        const auth = pathToJS(firebase, 'auth');
        return {
            groups: groups || {},
            uid: (!isLoaded(auth) || isEmpty(auth)) ? null : auth.uid
        };
    },
    (dispatch, { history }) => ({
        onSelect: (id) => history.push(`/info/${id}`)
    })
)(firebaseConnect([ '/groups', 'auth' ])(GroupSelect)));