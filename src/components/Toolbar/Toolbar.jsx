import React from 'react';
import AppBar from 'material-ui/AppBar';
import User from './../../container/User';

const Toolbar = ({ title, openDrawer, goHome, isLoggedIn }) => {
    console.log(title, isLoggedIn);
    return <AppBar 
        title={title} 
        showMenuIconButton={isLoggedIn}
        onLeftIconButtonTouchTap={openDrawer}
        onTitleTouchTap={goHome} />;
};

export default Toolbar;