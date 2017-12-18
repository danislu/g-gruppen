import React from 'react';
import { RaisedButton, CircularProgress } from 'material-ui';
import { isLoaded, isEmpty } from 'react-redux-firebase';

export default ({ group, joinGroup }) => {
  if (!isLoaded(group) || isEmpty(group)) {
    return <CircularProgress style={{marginTop: 5}} size={48} color="black" />;
  }

  return (
    <div style={{display: 'flex'}}>
      <p>Du er invitert til å delta i gågruppen { group ? group.name : 'loading...' }?</p>
      <RaisedButton onClick={joinGroup} label={'Godta invitasjon'} />
    </div>
  )
};