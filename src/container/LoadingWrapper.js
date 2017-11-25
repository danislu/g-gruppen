import React from 'react';
import { pathToJS, isLoaded } from "react-redux-firebase";
import { connect } from 'react-redux';
import LoadingScreen from 'material-ui/CircularProgress';

const mapState = ({ firebase }) => {
    const profile = pathToJS(firebase, 'profile');
    return {
        loaded: isLoaded(profile)
    };
};

const Wrapper = connect(mapState)(({ loaded, children }) => {
    if (!loaded) {
        return <LoadingScreen />;
    }

    return { children };
});

export default (Comp) => (<Wrapper>
    <Comp />
</Wrapper>);