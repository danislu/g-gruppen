import React from 'react';

import DayPicker from './DayPicker';
import DayEditor from './DayEditor';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center'
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.onDayClick = this.onDayClick.bind(this);
        this.state = {
            selectedDay: new Date()
        };
    }

    onDayClick(day, { selected }) {
        console.log(day.to);
        this.setState({
            selectedDay: selected ? undefined : day
        });
    }

    render() {
        return (
            <div style={containerStyle}>
                <DayPicker />
                <DayEditor />
            </div>
        );
    }    
}
