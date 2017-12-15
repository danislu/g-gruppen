import React from 'react';
import AppBar from 'material-ui/AppBar';
import User from './../container/user';

const Toolbar = ({ title, openDrawer, goHome, isLoggedIn }) => (
    <AppBar 
        title={title} 
        showMenuIconButton={isLoggedIn}
        onLeftIconButtonTouchTap={openDrawer}
        onTitleTouchTap={goHome} />
);

export default Toolbar;