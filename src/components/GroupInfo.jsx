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
import { isLoaded, isEmpty } from 'react-redux-firebase';
import Agenda from './Agenda/index';

const styles = {
    wrapper: {
        marginLeft: 10,
        marginRigth: 10,
        display: 'flex',
        flexDirection: 'column',
        //alignItems: 'center'
    },
    button: {
        marginBottom: 5
    }
};


export default ({ group, ...rest }) => {
    if (!isLoaded(group) || isEmpty(group)) {
        return "Laster...";
    }
    const { name, description } = group;

    return (
        <div style={styles.wrapper}>
            <h2>{ name }</h2>
            <p>{ description }</p>
            <Agenda />
        </div>
    );
}
