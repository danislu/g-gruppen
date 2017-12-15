import React from 'react';
import {  
    List,
    Subheader,
    ListItem
} from 'material-ui';
import { isLoaded } from 'react-redux-firebase';

const styles = {
    wrapper: {
        marginLeft: 10,
        marginRigth: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    button: {
        marginBottom: 5
    }
};

export default ({ groups, uid, onSelect, id }) => {

    const renderGroup = ({ name, description, weekdays, inviteOnly, id }) => (
        <ListItem
            //leftAvatar={<Avatar><IconButton><Icon /></IconButton></Avatar>}
            primaryText={name}
            onClick={() => onSelect(id)}
            secondaryText={
            <p>
                <span style={{color: '#000'}}>{inviteOnly ? "Private" : "Åpen" }</span> --
                { description }
            </p>
            }
            secondaryTextLines={2}
        />
    );
    
    const renderGroups = (groups) => Object.entries(groups)
        .map(([id, value]) => ({ id, ...value }))
        .filter(({ inviteOnly, users = {}}) => {
            return true;
            const keys = Object.keys(users)
            return !inviteOnly || keys.length > 0
                ? keys.some((key) => key === uid)
                : true
        })
        .sort((a,b) => a.created < b.created)
        .map(renderGroup);

    return (
        <div style={styles.wrapper}>
            <List>
            <Subheader>Gågrupper { id }!</Subheader>
            {
                isLoaded(groups) 
                    ? renderGroups(groups)
                    : "Laster..."
            }
            </List>
        </div>
    );
}

