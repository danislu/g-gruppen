import GroupInfo from './../components/GroupInfo';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import { operations } from '../state/ducks/days/index';
import withRouterAndParamsAsProps from './withRouterAndParamsAsProps';
import pureify from './pureify';

const populates = [
    { child: 'users', root: 'users' },
    { child: 'creator', root: 'users' }
];

export default pureify(
    // firebaseConnect([{ path: 'groups', populates }]),
    connect(
        ({ app, firebase: { data: { groups }}}) => {
            const { selectedGroup } = app;
            return {
                group: groups ? groups[selectedGroup] : null
            };
        }
    )
)(GroupInfo);