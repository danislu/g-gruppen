import Toolbar from './Toolbar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { operations } from './../../state/ducks/app';
import { pathToJS, dataToJS, firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import withCurrentGroup from './../../container/withCurrentGroup';
import pureify from './../../container/pureify';
import withRouterAndParamsAsProps from './../../container/withRouterAndParamsAsProps';
import { compose } from 'recompose';

export default compose(
    firebaseConnect([ 'auth' ]),
    connect(
        ({ firebase }) => {
            const auth = pathToJS(firebase, 'auth');
            return {
                isLoggedIn: !!(auth && auth.uid),
                title: 'Gågruppen'
            }
        },
        (dispatch) => ({ 
            openDrawer: () => dispatch(operations.openDrawer()),
            goHome: () => dispatch(operations.goHome1())
        })
    )
)(Toolbar);
