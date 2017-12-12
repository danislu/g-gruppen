import React from 'react';
import { connect } from 'react-redux';
import { pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { opertions } from './../state/ducks/login';
import User from './../components/User';

const mapStateToProps = ({ firebase }) => {
    const auth = pathToJS(firebase, 'auth');
    const profile = pathToJS(firebase, 'profile');
    return {
        isLoggedIn: (auth && auth.uid),
        profile
    };
};

const mapDispToProps = (dispatch) => ({
    doLogOut: () => dispatch(opertions.logOut())
});

export default connect(mapStateToProps, mapDispToProps)(User);