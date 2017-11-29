import React from 'react';
import DayPicker from './DayPicker';
import DayEditor from './DayEditor';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center'
};

export default class WalkerCalender extends React.Component {
    render() {
        return (
            <div style={containerStyle}>
                <DayPicker />
                <DayEditor />
            </div>
        );
    }    
}
