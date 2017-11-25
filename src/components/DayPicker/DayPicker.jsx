import React from 'react';
import Helmet from 'react-helmet';
import DayPicker, {DateUtils} from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import {isLoaded} from 'react-redux-firebase';
import CircularProgress from 'material-ui/CircularProgress';
import UserAvatar from 'react-user-avatar';
import {getId} from './../../utils/dates';

import 'react-day-picker/lib/style.css';
import 'moment/locale/nb';

const createModifiers = (days) => ({
    full: d => Object
        .keys(days)
        .some((date) => DateUtils.isSameDay(d, new Date(date))),
    disabled: {
        daysOfWeek: [0, 6]
    },
    past: {
        before: new Date()
    }
});

const renderWalker = ({
    displayName = "...",
    avatarUrl
}, idx) => (<UserAvatar
    key={`${idx}-${displayName}`}
    size="25"
    name={displayName}
    src={avatarUrl}/>);

const getWalkers = (list = {}, day) => {
    const a = Object
        .keys(list)
        .find((date) => date === getId(day));
    const walkers = a
        ? list[a].walkers
        : {};
    return Object.values(walkers || {});
}

const renderDay = (list) => (day) => {
    const date = day.getDate();
    const dateStyle = {
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontSize: '0.7em'
    };

    return (
        <div
            style={{
            height: 50,
            width: 25,
            position: 'relative'
        }}>
            <div style={dateStyle}>{date}</div>
            {getWalkers(list, day).map(renderWalker)}
        </div>
    );
}

export default({selectedDay, dayList, onDayClick}) => {
    if (!isLoaded(dayList)) {
        return <CircularProgress/>;
    }

    return (
        <div>
            <Helmet>
                <style>
                    {
                        ` .DayPicker-Day--full {
                            background-color:#0077D4 color: #cccc;
                        }

                        .DayPicker-Day--past {
                            color: #cccc;
                        }

                        .DayPicker-Day--today {
                            color: red;
                        }
                         `
                    }</style>
            </Helmet>
            <DayPicker
                showWeekNumbers
                enableOutsideDays
                onDayClick={onDayClick}
                selectedDays={selectedDay}
                renderDay={renderDay(dayList)}
                modifiers={createModifiers(dayList)}
                localeUtils={MomentLocaleUtils}
                locale={'nb'}/>
        </div>
    );
};
