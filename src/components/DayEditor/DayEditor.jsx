import React from 'react';
import UserAvatar from 'react-user-avatar';
import { RaisedButton, FloatingActionButton, Subheader, List, Avatar, ListItem, Chip, IconButton } from 'material-ui';
import { isInPast } from './../../utils/dates';
import ChildCareIcon from 'material-ui/svg-icons/places/child-care';
import PhoneIcon from 'material-ui/svg-icons/hardware/phone-iphone';
import EmailIcon from 'material-ui/svg-icons/communication/email';

const styles = {
    chip: {
        margin: 1,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    containerStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 15,
        fontSize: '1.5em'
    },
    fabStyle: {
        margin: 5
    }
};

const renderWalker = ({ displayName = "...", avatarUrl, email, phone, child }, idx) => (
    <ListItem key={`${idx}-${displayName}`}
        leftAvatar={<Avatar src={avatarUrl} />}
        primaryText={ `${displayName} - (${child || ""})` }
        secondaryText={<div style={styles.wrapper}>
            <IconButton onClick={() => window.open(`tel:${phone}`)}>
                <PhoneIcon viewBox='0 0 30 30' />
            </IconButton>
            <IconButton onClick={() => window.open(`mailto:${email}`)}>
                <EmailIcon viewBox='0 0 30 30' />
            </IconButton>
        </div>}
        secondaryTextLines={2}
  />);

export default ({ day, currentUserName, walkers, onRegister, onDeregister }) => {
    return (
        <div>
            { day.toString() }
            
            <List>
                <Subheader>Følger</Subheader>
                { 
                    walkers.map(renderWalker) 
                }
            </List>
            
            {
                !isInPast(day)
                    ? 
                    <div style={styles.containerStyle}>
                        <FloatingActionButton style={styles.fabStyle} onClick={() => onRegister(day)}>+</FloatingActionButton>
                        <FloatingActionButton style={styles.fabStyle} onClick={() => onDeregister(day)}>-</FloatingActionButton>
                    </div>
                    : null
            }
        </div>
    );
};
