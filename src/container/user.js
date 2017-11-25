import React from 'react';
import { connect } from 'react-redux';
import { pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import CircularProgress from 'material-ui/CircularProgress';
import UserAvatar from 'react-user-avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { opertions } from './../state/ducks/login';

const Avatar = ({ displayName, avatarUrl }) => <UserAvatar size="48" name={displayName} src={avatarUrl} />;

const User = ({ isLoggedIn, profile, doLogin, doLogOut }) => {

    if (!isLoggedIn) {
        return null;
    }

    if (!isLoaded(profile) || isEmpty(profile)){
        return <CircularProgress color="black" />;
    }
    
    return (
        <IconMenu
            iconButtonElement={<div><Avatar displayName={profile.displayName} avatarUrl={profile.avatarUrl} /></div>}
            anchorOrigin={{horizontal: 'left', vertical: 'center'}}
            targetOrigin={{horizontal: 'left', vertical: 'center'}}>
            <MenuItem primaryText="Log out" onClick={doLogOut} />
        </IconMenu>
    );
};

const mapStateToProps = ({ firebase }) => {
    const auth = pathToJS(firebase, 'auth');
    const profile = pathToJS(firebase, 'profile');
    return {
        isLoggedIn: (auth && auth.uid),
        profile
    };
};

const mapDispToProps = (dispatch) => ({
    doLogin: () => dispatch(opertions.logIn()),
    doLogOut: () => dispatch(opertions.logOut())
});

export default connect(mapStateToProps, mapDispToProps)(User);