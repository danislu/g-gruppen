import React from 'react';
import AppBar from 'material-ui/AppBar';
import User from './../container/user';

const Toolbar = ({ title, openDrawer }) => (
    <AppBar 
        title={title} 
        showMenuIconButton={true}
        onLeftIconButtonTouchTap={openDrawer} />
);

export default Toolbar;