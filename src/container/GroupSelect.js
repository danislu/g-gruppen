import GroupSelect from './../components/GroupSelect';
import { connect } from 'react-redux';
import { pathToJS, dataToJS, firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { operations } from './../state/ducks/app';
import pureify from './pureify';

export default pureify(
    // firebaseConnect([ 'groups' ]),
    connect(
        ({ firebase: { auth, data: { groups }} }) => {
            return {
                groups: groups || {},
                uid: (!isLoaded(auth) || isEmpty(auth)) ? null : auth.uid
            };
        },
        (dispatch) => ({
            onSelect: (id) => dispatch(operations.selectGroup(id))
        })
    ),
)(GroupSelect);
