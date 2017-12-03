import Agenda from './Agenda';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import { operations } from './../../state/ducks/days';
import withCurrentGroup from './../../container/withCurrentGroup';

export default withCurrentGroup(connect(
    ({ firebase }, { id }) => {
        const group = populatedDataToJS(firebase, `/groups/${id}`) || {};
        return {
            group
        };
    },
    (dispatch, { id }) => ({
        onAdd: (day) => dispatch(operations.registerWalker({ id, day })),
        onRemove: (day) => dispatch(operations.deregisterWalker({ id , day })),
        onChangeFree: () => dispatch({ type: 'whatever'})
    })
)(firebaseConnect([ '/groups' ])(Agenda)));