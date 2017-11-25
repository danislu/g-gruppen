import React from 'react';
import AppBar from 'material-ui/AppBar';
import User from './user';

const Toolbar = () => (
    <AppBar 
        title="Gågruppen" 
        showMenuIconButton={false}
        iconElementRight={<User />}/>
);

export default Toolbar;