import GroupInfo from './../components/GroupInfo';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import { operations } from '../state/ducks/days/index';
import withCurrentGroup from './withCurrentGroup';

export default withCurrentGroup(connect(
    ({ days, firebase }, { id }) => {
        const groups = populatedDataToJS(firebase, `/groups`, [{ child: 'users', root: 'users' }, { child: 'creator', root: 'users' }]) || {};
        return {
            group: groups[id]
        };
    },
    (dispatch, { id }) => ({
        onAdd: (day) => dispatch(operations.registerWalker({ id, day })),
        onRemove: (day) => dispatch(operations.deregisterWalker({ id , day })),
        onChangeFree: () => dispatch({ type: 'whatever'})
    })
)(firebaseConnect([ '/groups' ])(GroupInfo)));