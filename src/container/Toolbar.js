import Toolbar from './../components/Toolbar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { operations } from './../state/ducks/app';
import { pathToJS } from 'react-redux-firebase';

export default connect(
    ({ firebase }) => {
        const auth = pathToJS(firebase, 'auth');
        return {
            isLoggedIn: (auth && auth.uid),
            title: 'Gågruppeappen' 
        }
    },
    (dispatch) => ({ 
        openDrawer: () => dispatch(operations.openDrawer()),
        goHome: () => dispatch(push("/")) 
    })
)(Toolbar);