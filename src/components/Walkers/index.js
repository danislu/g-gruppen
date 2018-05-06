import Walkers from './Walkers';
import { compose } from 'redux';
import { pure } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS, firebase } from 'react-redux-firebase';
import { operations } from './../../state/ducks/days/index';
import withRouterAndParamsAsProps from './../../container/withRouterAndParamsAsProps';
import pureify from '../../container/pureify';

const populates = [
    { child: 'users', root: 'users' },
    { child: 'creator', root: 'users' },
    { child: 'walkers', root: 'users' },
];

export default pureify(
    // firebaseConnect([{ path: 'groups', populates }]),
    withRouterAndParamsAsProps,
    connect(
        ({ firebase: { data: { groups }} }, { id }) => ({
            group: groups ? groups[id] : null
        }),
        (dispatch, { id }) => ({
            onAdd: (day) => dispatch(operations.registerWalker({ id, day })),
            onRemove: (day) => dispatch(operations.deregisterWalker({ id , day })),
            onChangeFree: () => dispatch({ type: 'whatever'})
        })
    )
)(Walkers);