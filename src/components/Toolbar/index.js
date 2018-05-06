import Toolbar from './Toolbar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { operations } from './../../state/ducks/app';
import withCurrentGroup from './../../container/withCurrentGroup';
import pureify from './../../container/pureify';
import withRouterAndParamsAsProps from './../../container/withRouterAndParamsAsProps';
import { compose } from 'recompose';

export default compose(
    connect(
        ({ firebase: { auth } }) => ({
            isLoggedIn: !!(auth && auth.uid),
            title: 'Gågruppen'
        }),
        (dispatch) => ({ 
            openDrawer: () => dispatch(operations.openDrawer()),
            goHome: () => dispatch(operations.goHome1())
        })
    )
)(Toolbar);
