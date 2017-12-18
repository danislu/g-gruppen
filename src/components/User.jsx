import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { CircularProgress, Divider, ListItem, Avatar, MenuItem } from 'material-ui';

const styles = {
    wrapper: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
};

const getInner = (profile) => {
    if (!isLoaded(profile) || isEmpty(profile)){
        return <CircularProgress style={{marginTop: 5}} size={48} color="black" />;
    }
    
    const { displayName, avatarUrl } = profile;
    return (
        <Link to={'/contact'}>
            <MenuItem
                primaryText={displayName}
                leftIcon={<Avatar src={avatarUrl} />}
            />
        </Link>
    );
};

const User = ({ isLoggedIn, profile, onClick }) => {

    if (!isLoggedIn) {
        return null;
    }
    
    return getInner(profile);
};

export default User;