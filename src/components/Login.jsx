import React from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';
import CircularProgress from 'material-ui/CircularProgress';

export default ({ isAuthenticating, doLogin }) => (
    <div>
        <p>Gågruppe... blah blah blah</p>
        {
            isAuthenticating 
                ? <CircularProgress />
                : <FacebookLoginButton onClick={doLogin} />
        }        
    </div>
);