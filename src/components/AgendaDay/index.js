import AgendaDay from './AgendaDay';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import { operations } from './../../state/ducks/days';
import withRouterAndParamsAsProps from './../../container/withRouterAndParamsAsProps';
import { getId } from './../../utils/dates';

const populates = [
    { child: 'walkers', root: 'users' }
];

export default withRouterAndParamsAsProps(connect(
    ({ firebase }, { id, date, ...props }) => {
        const day = populatedDataToJS(firebase, `/groups/${id}/days/${getId(date)}`, populates);
        const walkers = day ? day.walkers : {};
        console.log(walkers);
        return {
            date,
            ...day,
            walkers: Object.values(walkers || {}),
            ...props
        };
    },
    (dispatch, { id }) => ({
        onAdd: (day) => dispatch(operations.registerWalker({ id, day })),
        onRemove: (day) => dispatch(operations.deregisterWalker({ id , day })),
        onChangeFree: () => dispatch({ type: 'whatever'})
    })
)(firebaseConnect([ '/groups', 'users' ])(AgendaDay)));