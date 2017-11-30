import AgendaDay from './AgendaDay';
import { connect } from 'react-redux';
import { pathToJS, dataToJS, firebaseConnect, isEmpty, isLoaded, populatedDataToJS } from 'react-redux-firebase';
import { operations } from './../../state/ducks/days';
import withCurrentGroup from './../../container/withCurrentGroup';
import { getId } from './../../utils/dates';

const populates = [
    { child: 'walkers', root: 'users' }
];

export default withCurrentGroup(connect(
    ({ firebase }, { id, date }) => {
        const day = populatedDataToJS(firebase, `/groups/${id}/days/${getId(date)}`, populates);
        const walkers = day ? day.walkers : {};
        console.log(walkers);
        return {
            date,
            ...day,
            walkers: Object.values(walkers || {}),
        };
    },
    (dispatch, { id }) => ({
        onAdd: (day) => dispatch(operations.registerWalker({ id, day })),
        onRemove: (day) => dispatch(operations.deregisterWalker({ id , day })),
        onChangeFree: () => dispatch({ type: 'whatever'})
    })
)(firebaseConnect([ '/groups', 'users' ])(AgendaDay)));