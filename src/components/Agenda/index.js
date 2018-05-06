import Agenda from './Agenda';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import { operations } from './../../state/ducks/days';
import withRouterAndParamsAsProps from './../../container/withRouterAndParamsAsProps';
import pureify from '../../container/pureify';
import { compose } from 'recompose';

export default pureify(
    // firebaseConnect([ 'groups' ]),
    withRouterAndParamsAsProps,
    connect(
        ({ app, firebase: { data: { groups }} }, { id }) => ({
            group: groups ? groups[id] : {},
            id
        }),
        (dispatch) => ({ dispatch }),
        (stateProps, { dispatch }, ownProps) => Object.assign(
            {}, 
            ownProps, 
            stateProps, 
            {
                onAdd: (day) => dispatch(operations.registerWalker({ id: stateProps.id, day })),
                onRemove: (day) => dispatch(operations.deregisterWalker({ id: stateProps.id , day })),
                onChangeFree: () => dispatch({ type: 'whatever'})
            }
        )
    )
)(Agenda);