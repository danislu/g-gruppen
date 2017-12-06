import React from 'react';
import { BottomNavigation, Paper } from 'material-ui';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import ChildIcon from 'material-ui/svg-icons/places/child-care';
import InfoIcon from 'material-ui/svg-icons/action/info';
import { BottomNavigationItem } from 'material-ui/BottomNavigation';
import { withRouter, Route } from 'react-router';

const getIndex = (part) => {
    switch(part) {
        case 'walker': return 0;
        case 'kid': return 1;
        default: return 2;
    }
};

const BottomNav = ({items, index}) => {
    return (<Paper zDepth={1}>
        <BottomNavigation selectedIndex={index}>
        {
            items.map(item => <BottomNavigationItem {...item} />)
        }
        </BottomNavigation>
    </Paper>);
};

const withSelectedIndex = withRouter(({ match, history }) => {
    const { params } = match;
    const { part, id } = params;

    const baseUrl = `/group/${id}`;
    const index = getIndex(part);
    
    const items = [
        { icon: <WalkIcon />, label: 'Følger', onClick: () => history.push(`${baseUrl}/walker`) },
        { icon: <ChildIcon />, label: 'Deltager', onClick: () => history.push(`${baseUrl}/kid`) },
        { icon: <InfoIcon />, label: 'Info', onClick: () => history.push(`${baseUrl}/info`) },
    ];

    return <BottomNav items={items} index={index} />;
});

export default ({path, parts}) => () => {
    return (
        <div>
        { 
            <Route path={path} component={withSelectedIndex} />
        }
        </div>
    );
};

