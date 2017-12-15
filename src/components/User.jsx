import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import UserAvatar from 'react-user-avatar';
import { CircularProgress, Divider } from 'material-ui';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}

const Avatar = ({ displayName, avatarUrl }) => <div style={styles.wrapper}>
    <UserAvatar size="48" name={displayName} src={avatarUrl} />
    <h4>{ displayName }</h4>
</div>;

const User = ({ isLoggedIn, profile, onClick }) => {

    if (!isLoggedIn) {
        return null;
    }

    if (!isLoaded(profile) || isEmpty(profile)){
        return <CircularProgress color="black" />;
    }
    
    return (
        <div onClick={onClick}>
            <Avatar displayName={profile.displayName} avatarUrl={profile.avatarUrl} />
        </div>
    );
};

export default User;