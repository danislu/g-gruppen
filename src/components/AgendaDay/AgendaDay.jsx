import React from 'react';
import { Paper, ListItem, Avatar, IconButton, List, FlatButton, Card, CardHeader, CardText, CardActions, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import moment from 'moment';
import PhoneIcon from 'material-ui/svg-icons/hardware/phone-iphone';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import { isInPast } from '../../utils/dates';
moment.locale('nb');

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    list: {
        minWidth: '100%'
        //display: 'flex',
        //flexDirection: 'column',
        //alignItems: 'strech',
        //justifyContent: 'center'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
};

const iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="more"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={ '#000' } />
    </IconButton>
  );

//const getAvatar = (url, idx) => 

const avatars = (urls) => 
    <div>
    { urls.map((url, idx) => <Avatar key={idx} style={{ 
        marginTop: 20 * idx,
        float: 'left',
        display: 'inline',
        marginLeft: -40 * idx,
    }} src={url} />) }
    </div>;

const commaConcat = (tot, curr) => {
    return tot === '' 
        ? curr
        : `${tot}, ${curr}`;
}

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

const renderDisabledDay = (date) => <Paper zDepth={1} style={{ marginBottom: 2 }}>
    <ListItem key={`${date}`} disabled={true}
        primaryText={<div style={styles.wrapper}>
            {moment(date).format('dddd LL')}<br />
        </div>}
        secondaryTextLines={1}
    />
</Paper>;

const renderDay = ({ walkers, date, free, disabled, onAdd, onRemove, onChangeFree }) => {
    const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onClick={() => onAdd(date)}>Gå</MenuItem>
            <MenuItem onClick={() => onRemove(date)}>Ikke gå</MenuItem>
        </IconMenu>
    );

    if (disabled){
        return renderDisabledDay(date);
    }

    return <Paper key={`${date}`} zDepth={1} style={{ marginBottom: 2 }}>
        <ListItem
            rightIconButton={ !isInPast(date) ? rightIconMenu : null }
            leftAvatar={ avatars(walkers.map(w => w.avatarUrl)) }
            primaryText={ walkers.map(w => w.displayName).reduce(commaConcat, '') }    
            secondaryText={<div style={styles.wrapper}>
                { moment(date).calendar() }
                <br />
                { moment(date).format('dddd LL') }
            </div>}
            secondaryTextLines={2}
        />
    </Paper>;
};

export default renderDay;