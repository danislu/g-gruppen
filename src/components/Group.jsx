import React from 'react';

const styles = {
    containercontainer: { 
        flex: '1',
        backgroundColor: 'maroon'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'cyan',

    },
    content: {
        flex: '1',
        alignItem: 'stretch',
        backgroundColor: 'yellow'
    },
    navbar: {
        flex: '0',
        backgroundColor: 'blue'
    }
};

export default ({ history, routes }) => {
    return (
        <div style={styles.containercontainer}>
        <div style={styles.container}>  
            <div style={styles.content}>
               <h1>asdf</h1>
                { /* { routes.map() } */ }
            </div>
            
        </div>
        </div>
    );
};

