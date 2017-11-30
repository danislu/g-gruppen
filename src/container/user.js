import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import UserAvatar from 'react-user-avatar';
import { MenuItem, IconMenu, CircularProgress, Divider } from 'material-ui';
import { opertions } from './../state/ducks/login';

const Avatar = ({ displayName, avatarUrl }) => <UserAvatar size="48" name={displayName} src={avatarUrl} />;

const User = ({ isLoggedIn, profile, doLogOut }) => {

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
            <MenuItem primaryText="Hjem" containerElement={<Link to="/" />} />
            <MenuItem primaryText="Kontakt info" containerElement={<Link to="/contact" />} />
            <Divider />
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
    doLogOut: () => dispatch(opertions.logOut())
});

export default connect(mapStateToProps, mapDispToProps)(User);