import Drawer from './../components/Drawer';
import { connect } from 'react-redux';
import { operations } from '../state/ducks/app/index';

export default connect(
    (state) => ({ isOpen: state.app.drawerOpen }),
    (dispatch) => ({ drawerChange: (open) => dispatch(open ? operations.openDrawer() : operations.closeDrawer())})
)(Drawer);