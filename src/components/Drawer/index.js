import Drawer from './Drawer';
import { connect } from 'react-redux';
import { operations } from './../../state/ducks/app';
import { dataToJS, firebaseConnect } from 'react-redux-firebase';

export default connect(
    ({ firebase, app: { drawerOpen, selectedGroup } }) => ({ 
        isOpen: drawerOpen,
        currentGroup: dataToJS(firebase, `/groups/${selectedGroup}`)
    }),
    (dispatch) => ({ drawerChange: (open) => dispatch(open ? operations.openDrawer() : operations.closeDrawer())})
)(firebaseConnect([ '/groups' ])(Drawer));