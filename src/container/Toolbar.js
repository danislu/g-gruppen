import Toolbar from './../components/Toolbar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { operations } from './../state/ducks/app';
import { pathToJS, dataToJS, firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import withCurrentGroup from './withCurrentGroup';
/*
export default connect(
    ({ firebase, app }) => {
        const { selectedGroup } = app;
        const group = dataToJS(firebase, `/groups/${selectedGroup}`);
        const auth = pathToJS(firebase, 'auth');
        return {
            isLoggedIn: (auth && auth.uid),
            title: !!group ? group.name : 'Gågruppen'
        }
    },
    (dispatch) => ({ 
        openDrawer: () => dispatch(operations.openDrawer()),
        goHome: () => dispatch(push("/"))
    })
)(firebaseConnect([ '/groups' ])(Toolbar));
*/

export default withCurrentGroup(connect(
    ({ firebase }, { currentGroup }) => {
        const group = currentGroup;
        const auth = pathToJS(firebase, 'auth');
        return {
            isLoggedIn: (auth && auth.uid),
            title: !!group ? group.name : 'Gågruppen'
        }
    },
    (dispatch) => ({ 
        openDrawer: () => dispatch(operations.openDrawer()),
        goHome: () => dispatch(push("/"))
    })
)(Toolbar));
