import React from 'react';

import AppBar from 'material-ui/AppBar';
import User from './user';
import { withRouter } from 'react-router-dom';

const Toolbar = ({ history }) => (
    <AppBar 
        title="Gågruppen" 
        showMenuIconButton={false}
        onTitleTouchTap={() => history.push("/")}
        iconElementRight={<User />}/>
);

export default withRouter(Toolbar);