import React from 'react';
import { 
    TextField, 
    FloatingActionButton, 
    Divider, 
    Paper, 
    IconButton, 
    RaisedButton,
    List,
    Subheader,
    ListItem,
    Avatar
} from 'material-ui';
import { Icon } from 'material-ui/svg-icons/maps/directions-walk';
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

export default ({ group, history }) => {

    const renderGroup = ({ name, id }) => (
        <ListItem
            //leftAvatar={<Avatar><IconButton><Icon /></IconButton></Avatar>}
            primaryText={name}
            onClick={() => onSelect(id)}
            secondaryText={
            <p>
                <span style={{color: '#000'}}>Brendan Lim</span> --
                I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
            }
            secondaryTextLines={2}
        />
    );
    
    const renderGroups = (groups) => Object.entries(groups)
    // slitt liste i to...
        .map(([id, value]) => ({ id, ...value }))
        .map(renderGroup);

    return (
        <div style={styles.wrapper}>
            <List>
            <Subheader>Gågrupper</Subheader>
            {
                isLoaded(groups) 
                    ? renderGroups(groups)
                    : "Laster..."
            }
            </List>
        </div>
    );
}

