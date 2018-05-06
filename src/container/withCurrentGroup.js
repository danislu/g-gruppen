import React from 'react';
import { connect } from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'recompose';

const withCurrentGroup = (Component) => {
    const C = compose(
      // firebaseConnect([ 'groups' ]),
      connect(
        ({ firebase: { data: { groups }} }, ownProps) => ({
          currentGroup: groups[ownProps.id],
        })
      ),
    )(Component);

    C.WrappedComponent = Component;

    return hoistStatics(C, Component);
};

export default withCurrentGroup;