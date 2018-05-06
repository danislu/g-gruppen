import React from 'react';
import withRouterAndParamsAsProps from "../../container/withRouterAndParamsAsProps";
import { RaisedButton } from "material-ui";
import { connect } from 'react-redux';
import { dataToJS, firebaseConnect } from 'react-redux-firebase';
import { operations } from '../../state/ducks/app/index';
import Invite from './Invite';

export default withRouterAndParamsAsProps(
  connect(
    ({ firebase }, { id }) => {
      console.log(id);
      return ({
        group: dataToJS(firebase, `/groups/${id}`)
      });
    },
    (dispatch) => ({
      dispatch
    }),
    (stateProps, { dispatch }, ownProps) => Object.assign({}, ownProps, stateProps, {
      joinGroup: () => dispatch(operations.joinGroup(stateProps.group))
    })
  )(firebaseConnect([ 'groups' ])(Invite))
);