import React from 'react';
import { withRouter } from 'react-router-dom';
import hoistStatics from 'hoist-non-react-statics';

const withCurrentGroup = (Component) => {
    const C = withRouter((props) => {
        const { match, ...rest} = props;
        return (<Component id={match.params.id} {...rest} />);
    });

    C.WrappedComponent = Component;

    return hoistStatics(C, Component);
};

export default withCurrentGroup;