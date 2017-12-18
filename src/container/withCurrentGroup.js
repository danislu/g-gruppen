import React from 'react';
import { connect } from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

const withCurrentGroup = (Component) => {
    const C = connect(
      ({ firebase, app }) => ({
        currentGroup: dataToJS(firebase, `/groups/${app.selectedGroup}`)
      })
    )(firebaseConnect([ '/groups' ])(Component));

    C.WrappedComponent = Component;

    return hoistStatics(C, Component);
};

export default withCurrentGroup;