import React from 'react';
import UserAvatar from 'react-user-avatar';
import { RaisedButton, FloatingActionButton } from 'material-ui';

const renderWalker = ({ displayName = "...", avatarUrl }, idx) => (<div key={`${idx}-${displayName}`}><UserAvatar size="30" name={displayName} src={avatarUrl} /> {displayName}</div>);

const containerStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10,
    fontSize: '1.5em'
};

const fabStyle = {
    margin: 5
};

export default ({ day, currentUserName, walkers, onRegister, onDeregister }) => {
    return (
        <div>
            { day.toString() }
            { walkers.map(renderWalker) }

            <div style={containerStyle}>
                <FloatingActionButton style={fabStyle} onClick={() => onRegister(day)}>+</FloatingActionButton>
                <FloatingActionButton style={fabStyle} onClick={() => onDeregister(day)}>-</FloatingActionButton>
            </div>
        </div>
    );
};
