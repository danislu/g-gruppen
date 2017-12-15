import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import UserAvatar from 'react-user-avatar';
import { CircularProgress, Divider } from 'material-ui';

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
    return (<Link to={'/contact'} style={styles.wrapper}>
        <UserAvatar size={48} name={displayName} src={avatarUrl} />
        <h3 style={{ marginLeft: 15 }}>{ displayName }</h3>
    </Link>);
};

const User = ({ isLoggedIn, profile, onClick }) => {

    if (!isLoggedIn) {
        return null;
    }
    
    return (<div style={styles.wrapper}>
        { getInner(profile) }
    </div>);
};

export default User;