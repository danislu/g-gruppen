import Drawer from './Drawer';
import { connect } from 'react-redux';
import { operations } from './../../state/ducks/app';
import { dataToJS, firebaseConnect } from 'react-redux-firebase';
import { push } from 'react-router-redux';
import pureify from '../../container/pureify';
import withRouterAndParamsAsProps from '../../container/withRouterAndParamsAsProps';

export default pureify(
    firebaseConnect([ '/groups' ]),
    withRouterAndParamsAsProps,
    connect(
        ({ firebase, app: { drawerOpen }}, { match, id }) => ({
            match, 
            isOpen: drawerOpen,
            currentGroup: dataToJS(firebase, `/groups/${id}`)
        }),
        (dispatch) => ({ 
            drawerChange: (open) => dispatch(open ? operations.openDrawer() : operations.closeDrawer()),
            closeGroup: () => dispatch(operations.clearSelectedGroup()),
            doNew: () => dispatch(push('/create')),
        })
    )
)(Drawer);