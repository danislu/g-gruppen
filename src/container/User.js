import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import User from './../components/User';
import { compose } from 'recompose';

export default compose(
    connect(
        ({ firebase: { auth, profile }}) => ({
            isLoggedIn: (auth && auth.uid),
            profile
        }), 
        (dispatch) => ({
            click: () => dispatch(push('/contact'))
        })
    )
)(User);