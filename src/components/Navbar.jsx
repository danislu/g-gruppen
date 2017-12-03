import React from 'react';
import { BottomNavigation, Paper } from 'material-ui';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import ChildIcon from 'material-ui/svg-icons/places/child-care';
import InfoIcon from 'material-ui/svg-icons/action/info';
import { BottomNavigationItem } from 'material-ui/BottomNavigation';
import { withRouter, Route } from 'react-router';

const withSelectedIndex = (index) => (
    <Paper zDepth={1}>
        <BottomNavigation selectedIndex={index}>
            <BottomNavigationItem icon={<WalkIcon />} label={"Følger"} />
            <BottomNavigationItem icon={<ChildIcon />} label={"Delager"} />
            <BottomNavigationItem icon={<InfoIcon />} label={"Info"} />
        </BottomNavigation>
    </Paper>
);



export default (routes) => withRouter(({ match, selectedIndex }) => {
    return (
        <div>
        { 
            routes.map(
                (navPath, idx) => (
                    <Route path={navPath} 
                        component={() => withSelectedIndex(idx)} />
                )
            )
        }
        </div>
    );
});

