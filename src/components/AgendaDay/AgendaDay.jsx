import React from 'react';
import { Paper, ListItem, Avatar, IconButton, List, FlatButton, Card, CardHeader, CardText, CardActions, IconMenu, MenuItem } from 'material-ui';
//import AvatarStack from 'react-avatar-stack';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import moment from 'moment';
import PhoneIcon from 'material-ui/svg-icons/hardware/phone-iphone';
import EmailIcon from 'material-ui/svg-icons/communication/email';
moment().locale('nb');

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
    { urls.map(url => <Avatar src={url} />) }
    </div>;


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

const renderDay = ({ walkers, date, free, disabled, onAdd, onRemove, onChangeFree }) => {
    const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onClick={() => onAdd(date)}>Gå</MenuItem>
          <MenuItem onClick={() => onRemove(date)}>Ikke gå</MenuItem>
        </IconMenu>
      );

    return <Paper zDepth={1} style={{ marginBottom: 2 }}>
        <ListItem key={`${date}`} disabled={disabled}
            rightIconButton={rightIconMenu}
            leftAvatar={ avatars(walkers.map(w => w.avatarUrl)) }
            primaryText={ walkers.map(w => w.displayName) }    
            secondaryText={<div style={styles.wrapper}>
                {moment(date).format('dddd LL')}<br />
            </div>}
            secondaryTextLines={2}
        />
    </Paper>;
};

const oldRenderDay = ({ walkers, date, free, disabled, onAdd, onRemove, onChangeFree }) => {
    const expandable = walkers.length > 0;
    return (
        <Card key={`${date}`} disabled={disabled}>
        <CardHeader
          title={moment(date).calendar()}
          subtitle={moment(date).format('dddd LL')}
          actAsExpander={expandable}
          showExpandableButton={expandable}
        />
        <CardActions>
            <FlatButton label="Gå" onClick={() => onAdd(date)} />
            <FlatButton label="Ikke gå" onClick={() => onRemove(date)} />
        </CardActions>
        {
            expandable 
                ? <CardText>
                    De som går; { walkers.map((walker) => walker.displayName) }
                    </CardText>
                : null
        }
        {
            expandable 
                ? <CardText expandable={true}>
                        <List>
                            { walkers.map(renderWalker) }
                        </List>
                    </CardText>
                : null
        }
      </Card>);
};

export default renderDay;