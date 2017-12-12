import Toolbar from './../components/Toolbar';
import { connect } from 'react-redux';
import { operations } from './../state/ducks/app';

export default connect(
    (state) => ({ title: 'Gågruppeappen' }),
    (dispatch) => ({ openDrawer: () => dispatch(operations.openDrawer()) })
)(Toolbar);