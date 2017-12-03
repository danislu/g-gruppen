import React from 'react';
import { BottomNavigation, Paper, Snackbar } from 'material-ui';
import Icon from 'material-ui/svg-icons/maps/directions-walk';
import { BottomNavigationItem } from 'material-ui/BottomNavigation';

const styles = {
    containercontainer: { 
        flex: '1',
        backgroundColor: 'maroon'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'cyan',

    },
    content: {
        flex: '1',
        alignItem: 'stretch',
        backgroundColor: 'yellow'
    },
    navbar: {
        flex: '0',
        backgroundColor: 'blue'
    }
};

export default ({ history, routes }) => {
    const { push } = history;
    return (
        <div style={styles.containercontainer}>
        <div style={styles.container}>  
            <div style={styles.content}>
               <h1>asdf</h1>
                { /* { routes.map() } */ }
            </div>
            
        </div>
        </div>
    );
};

