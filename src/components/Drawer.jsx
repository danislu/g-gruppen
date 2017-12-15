import React from 'react';
import { Drawer, MenuItem } from 'material-ui';
import User from './../container/User';
import { Divider } from 'material-ui';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        //justifyContent: 'space-between',
        minHeight: '100vh'
    },
    header: {
        flex: 0,
        margin: 'auto'
    },
    content: {
        flex: 1,
        overflowY: 'scroll',
        position: 'relative'
    },
    footer: {
        flex: 0
    }
}

export default ({ isOpen, drawerChange }) => <Drawer 
    docked={false}
    open={isOpen}
    onRequestChange={(open) => drawerChange(open) }>
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h1>Gågruppen</h1>
            </div>
            <div style={styles.content}>
                <MenuItem 
                    primaryText={'AASDF'} />
            </div>
            <div style={styles.footer}>
                <Divider />
                <User />
            </div>
        </div>
    </Drawer>;