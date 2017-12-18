import Walkers from './Walkers';
import { compose } from 'redux';
import { pure } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import { operations } from './../../state/ducks/days/index';
import withRouterAndParamsAsProps from './../../container/withRouterAndParamsAsProps';
import pureify from '../../container/pureify';

export default pureify(
  firebaseConnect([ '/groups', 'auth', 'users' ]),
  connect(
    ({ app, days, firebase }) => {
        const { selectedGroup } = app;
        const groups = populatedDataToJS(firebase, `/groups`, [{ child: 'users', root: 'users' }, { child: 'creator', root: 'users' }]) || {};
        return {
            group: groups[selectedGroup]
        };
    },
    (dispatch, { id }) => ({
        onAdd: (day) => dispatch(operations.registerWalker({ id, day })),
        onRemove: (day) => dispatch(operations.deregisterWalker({ id , day })),
        onChangeFree: () => dispatch({ type: 'whatever'})
    }))
)(Walkers);