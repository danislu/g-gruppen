import AgendaDay from './AgendaDay';
import { connect } from 'react-redux';
import { operations } from './../../state/ducks/days';
import withRouterAndParamsAsProps from './../../container/withRouterAndParamsAsProps';
import { getId } from './../../utils/dates';
import pureify from '../../container/pureify';
import { compose } from 'recompose';
import { populate } from 'react-redux-firebase';

const populates = [
    { child: 'walkers', root: 'users' }
];

export default pureify(
    withRouterAndParamsAsProps,
    connect(
        ({ app, firebase }, { date, id, ...props }) => {
            const groups = populate(firebase, 'groups', populates);
            const group = groups ? groups[id] : null;
            const day = group ? group.days[getId(date)] : null;
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
