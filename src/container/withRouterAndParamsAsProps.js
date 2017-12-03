import React from 'react';
import { withRouter } from 'react-router-dom';
import hoistStatics from 'hoist-non-react-statics';

const withRouterAndParamsAsProps = (Component) => {
    const C = withRouter((props) => {
        const { match: { params } } = props;
        return (<Component {...params} {...props} />);
    });

    C.WrappedComponent = Component;

    return hoistStatics(C, Component);
};

export default withRouterAndParamsAsProps;