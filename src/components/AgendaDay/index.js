import AgendaDay from './AgendaDay';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import { operations } from './../../state/ducks/days';
import withRouterAndParamsAsProps from './../../container/withRouterAndParamsAsProps';
import { getId } from './../../utils/dates';
import pureify from '../../container/pureify';

const populates = [
    { child: 'walkers', root: 'users' }
];

export default pureify(
    withRouterAndParamsAsProps,
    firebaseConnect([ '/groups', 'users' ]),
    connect(
        ({ app, firebase }, { date, id, ...props }) => {
            const day = populatedDataToJS(firebase, `/groups/${id}/days/${getId(date)}`, populates);
            const walkers = day ? day.walkers : {};
            return {
                date,
                ...day,
                walkers: Object.values(walkers || {}),
                ...props
            };
        },
        (dispatch) => ({ dispatch }),
        (stateProps, { dispatch }, ownProps) => Object.assign({}, ownProps, stateProps, {
            onAdd: (day) => dispatch(operations.registerWalker({ id: ownProps.id, day })),
            onRemove: (day) => dispatch(operations.deregisterWalker({ id: ownProps.id , day })),
            onChangeFree: () => dispatch({ type: 'whatever'})
        })
    )
)(AgendaDay);