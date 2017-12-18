import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

const styles = {
    wrapper: {
        marginLeft: 10,
        marginRigth: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        marginBottom: 5
    }
};

export default ({ group, ...rest }) => {
    if (!isLoaded(group) || isEmpty(group)) {
        return "Laster...";
    }

    const { description } = group;
    return (
        <div style={styles.wrapper}>
            <h4>{ description }</h4>
        </div>
    );
}

