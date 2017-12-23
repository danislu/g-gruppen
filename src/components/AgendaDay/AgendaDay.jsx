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

const getStyle = (date) => ({
    marginBottom: 2,
    opacity: isInPast(date) ? 0.3 : 1,
    backgroundColor: date.toDateString() == new Date().toDateString() ? 'lightgreen' : 'white'
});

const renderDisabledDay = (date) => <Paper zDepth={1} style={getStyle(date)}>
    <ListItem key={`${date}`} disabled={true}
        primaryText={<div style={styles.wrapper}>
            {moment(date).format('dddd LL')}<br />
        </div>}
        secondaryTextLines={1}
    />
</Paper>;

const renderEnabledDay = ({ walkers, date, free, onAdd, onRemove, onChangeFree }) => {
    const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onClick={() => onAdd(date)}>Gå</MenuItem>
            <MenuItem onClick={() => onRemove(date)}>Ikke gå</MenuItem>
        </IconMenu>
    );
    
    const style = getStyle(date);

    return <Paper key={`${date}`} zDepth={1} style={style}>
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

const renderDay = (props) => {
    const { disabled, date } = props;
    if (disabled){
        return renderDisabledDay(date);
    }

    return renderEnabledDay(props);
};

export default renderDay;