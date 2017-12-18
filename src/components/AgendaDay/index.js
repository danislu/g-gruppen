import AgendaDay from './AgendaDay';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import { operations } from './../../state/ducks/days';
import withRouterAndParamsAsProps from './../../container/withRouterAndParamsAsProps';
import { getId } from './../../utils/dates';

const populates = [
    { child: 'walkers', root: 'users' }
];

export default connect(
    ({ app, firebase }, { date, ...props }) => {
        const { selectedGroup } = app;
        const day = populatedDataToJS(firebase, `/groups/${selectedGroup}/days/${getId(date)}`, populates);
        const walkers = day ? day.walkers : {};
        return {
            selectedGroup,
            date,
            ...day,
            walkers: Object.values(walkers || {}),
            ...props
        };
    },
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => Object.assign({}, ownProps, stateProps, {
        onAdd: (day) => dispatch(operations.registerWalker({ id: stateProps.selectedGroup, day })),
        onRemove: (day) => dispatch(operations.deregisterWalker({ id: stateProps.selectedGroup , day })),
        onChangeFree: () => dispatch({ type: 'whatever'})
    })
)(firebaseConnect([ '/groups', 'users' ])(AgendaDay));