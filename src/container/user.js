import React from 'react';
import { connect } from 'react-redux';
import { pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { push } from 'react-router-redux';
import User from './../components/User';

export default connect(
    ({ firebase }) => {
        const auth = pathToJS(firebase, 'auth');
        const profile = pathToJS(firebase, 'profile');
        return {
            isLoggedIn: (auth && auth.uid),
            profile
        };
    }, 
    (dispatch) => ({
        click: () => dispatch(push('/contact'))
    })
)(User);