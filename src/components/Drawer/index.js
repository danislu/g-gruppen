import Drawer from './Drawer';
import { connect } from 'react-redux';
import { operations } from './../../state/ducks/app';
import { push } from 'react-router-redux';
import pureify from '../../container/pureify';
import withRouterAndParamsAsProps from '../../container/withRouterAndParamsAsProps';

export default pureify(
    withRouterAndParamsAsProps,
    connect(
        ({ firebase: { data: { groups }}, app: { drawerOpen }}, { match, id }) => ({
            match, 
            isOpen: drawerOpen,
            currentGroup: groups ? groups[id] : null,
        }),
        (dispatch) => ({ 
            drawerChange: (open) => dispatch(open ? operations.openDrawer() : operations.closeDrawer()),
            closeGroup: () => dispatch(operations.clearSelectedGroup()),
            doNew: () => dispatch(push('/create')),
        })
    )
)(Drawer);