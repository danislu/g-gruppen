import React from 'react';
import { getId, isInPast } from './../../utils/dates'
import { ListItem, Avatar, IconButton, IconMenu, MenuItem, List, FlatButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import HomeIcon from 'material-ui/svg-icons/action/home';
import moment from 'moment';
import AgendaDay from './../AgendaDay';

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


const toWeek = (days) => ({
    0: !!days.sunday,
    1: !!days.monday,
    2: !!days.tuesday,
    3: !!days.wednesday,
    4: !!days.thursday,
    5: !!days.friday,
    6: !!days.saturday
});

const iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="more"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={'grey400'} />
    </IconButton>
  );

const renderDay = ({ date, event, onAdd, onRemove, onChangeFree }, idx) => {

    const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onClick={() => onAdd(date)}>Gå</MenuItem>
            <MenuItem onClick={() => onRemove(date)}>Ikke gå</MenuItem>
            <MenuItem checked={event.free} onChange={() => onChangeFree(date)}>Ingen gågruppe denne dagen</MenuItem>
        </IconMenu>
    );

    return (<ListItem
        key={`${idx}-${date}`}
        rightIconButton={rightIconMenu}
        primaryText={ moment(date).calendar()}
        secondaryText={
        <p>
            <span style={{color: '#000'}}>{JSON.stringify(event)}</span>
        </p>
        }
        secondaryTextLines={1}
    />);
};

const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
};
  
const renderWeek = ({ date, days = {}, weekdays, ...props }) => {
    const monday = getMonday(date);

    const week = toWeek(weekdays)
    return (<List style={styles.list}>
        { 
            [0,1,2,3,4,5,6]
                .map((i) => moment(monday).add(i, 'days').toDate())
                .filter(d => !isInPast(d))
                .filter(d => week[d.getDay()])
                .map((d) => <AgendaDay date={d} />)
        }
    </List>);
};

export default class Agenda extends React.PureComponent {
    constructor(props){
        super(props);

        this.state = {
            currentDate: new Date()
        }

        this.onNextWeekClick = this.onNextWeekClick.bind(this);
        this.onTodayClick = this.onTodayClick.bind(this);
    }

    onTodayClick() {
        this.setState({ currentDate: new Date() });
    }

    onNextWeekClick(value) {
        const { currentDate } = this.state;
        this.setState({
            currentDate: moment(currentDate).add(value, 'week').toDate()
        });
    }

    render() {
        const { currentDate } = this.state;
        const { group, ...rest } = this.props;
        
        return (<div style={styles.wrapper}>
            Agenda
            <div style={styles.buttons}>
                <IconButton onClick={() => this.onNextWeekClick(-1) }><ArrowBackIcon /></IconButton>
                <IconButton onClick={this.onTodayClick }><HomeIcon /></IconButton>
                <IconButton onClick={() => this.onNextWeekClick(1) }><ArrowForwardIcon /></IconButton>
            </div>
            { renderWeek({ date: currentDate, ...group, ...rest }) }
        </div>);
    }
}
