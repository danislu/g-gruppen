import React from 'react';
import { Drawer, MenuItem } from 'material-ui';
import User from './../../container/User';
import { Divider } from 'material-ui';
import Content from './GroupLinks';
import NewIcon from 'material-ui/svg-icons/content/create';
import ListIcon from 'material-ui/svg-icons/action/list';
import { Route } from 'react-router';

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

export default ({ match, isOpen, currentGroup, closeGroup, doNew, drawerChange }) => <Drawer 
    docked={false}
    open={isOpen}
    onRequestChange={(open) => drawerChange(open) }>
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h1>Gågruppen</h1>
            </div>
            <div style={styles.content}>
             { console.log(match) }
                <Route path={`/group/:id`} exact={false} component={Content} />

                <MenuItem key={'1'} primaryText="Alle" leftIcon={<ListIcon />} onClick={closeGroup} />
                <MenuItem key={'2'} disabled={true} primaryText="Ny gågruppe" leftIcon={<NewIcon />} onClick={doNew} />
                <Divider />
                <User />
            </div>
        </div>
    </Drawer>;