import React from 'react';
import { connect } from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

const withCurrentGroup = (Component) => {
    const C = connect(
      ({ firebase }, ownProps) => ({
        currentGroup: dataToJS(firebase, `/groups/${ownProps.id}`),
      })
    )(firebaseConnect([ '/groups' ])(Component));

    C.WrappedComponent = Component;

    return hoistStatics(C, Component);
};

export default withCurrentGroup;