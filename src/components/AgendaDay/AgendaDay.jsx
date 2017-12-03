import React from 'react';
import { ListItem, Avatar, IconButton, List, FlatButton, Card, CardHeader, CardText, CardActions } from 'material-ui';
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

export default ({ walkers, date, free, onAdd, onRemove, onChangeFree }) => {
    const expandable = walkers.length > 0;
    return (
        <Card key={`${date}`}>
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
