import React from 'react';
import { 
    Avatar, BottomNavigation
} from 'material-ui';
import { Icon } from 'material-ui/svg-icons/maps/directions-walk';
import { BottomNavigationItem } from 'material-ui/BottomNavigation';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

export default withRouter(({ hisory }) => {
    const { push } = history;
    return (
        <div>  
            <BottomNavigation>
                <BottomNavigationItem label={"Følge"} onClick={} />
                <BottomNavigationItem label={"Barn"} />
                <BottomNavigationItem label={"Info"} />
            </BottomNavigation>
        </div>
    );
});

