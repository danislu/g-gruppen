import Group from './../components/Group';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
//import { operations } from '../state/ducks/days/index';
import withRouterAndParamsAsProps from './withRouterAndParamsAsProps';

export default withRouterAndParamsAsProps(connect(
    ({ firebase }, { id }) => {
        const group = populatedDataToJS(firebase, `/groups/${id}`, [{ child: 'users', root: 'users' }, { child: 'creator', root: 'users' }]) || {};
        return {
            group
        };
    },
    (dispatch, { id }) => ({})
)(firebaseConnect([ '/groups' ])(Group)));