import Group from './../components/Group';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
//import { operations } from '../state/ducks/days/index';
import withRouterAndParamsAsProps from './withRouterAndParamsAsProps';
import { compose } from 'redux';

const populates = [{ child: 'users', root: 'users' }, { child: 'creator', root: 'users' }];

export default compose(
    // firebaseConnect([ 'groups' ]),
    withRouterAndParamsAsProps,
    connect(
        ({ firebase: { data: { groups }} }, { id }) => {
            const group = groups ? groups[id] : {};
            return {
                group
            };
        },
        (dispatch, { id }) => ({})
    )
)(Group);