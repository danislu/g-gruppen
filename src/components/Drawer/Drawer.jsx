import React from 'react';
import { Drawer, MenuItem } from 'material-ui';
import User from './../../container/User';
import { Divider } from 'material-ui';
import Content from './../GroupLinks';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    header: {
        flex: 0,
        margin: 'auto'
    },
    content: {
        flex: 1,
        position: 'relative'
    },
    footer: {
        flex: 0
    }
};

export default ({ isOpen, currentGroup, drawerChange }) => <Drawer 
    docked={false}
    open={isOpen}
    onRequestChange={(open) => drawerChange(open) }>
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h1>Gågruppen</h1>
                <h4>{ !!currentGroup ? currentGroup.name : '' }</h4>
            </div>
            <div style={styles.content}>
                <Content />
            </div>
            <div style={styles.footer}>
                <Divider />
                <User />
            </div>
        </div>
    </Drawer>;