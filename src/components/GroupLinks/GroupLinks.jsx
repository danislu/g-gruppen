import React from 'react';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import ChildIcon from 'material-ui/svg-icons/places/child-care';
import InfoIcon from 'material-ui/svg-icons/action/info';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import NewIcon from 'material-ui/svg-icons/content/create';
import { withRouter } from 'react-router';
import { MenuItem, Menu, Divider } from 'material-ui';


const DrawerContent = ({ currentGroup, doWalkerClick, doKidClick, doInfoClick, closeGroup, doNew }) => {
    const currentGroupLinks = (group) => {
        if (!group) {
            return null;
        }

        return (<div>
            <MenuItem primaryText="Følgere" leftIcon={<WalkIcon />} onClick={doWalkerClick} />
            <MenuItem primaryText="Deltagere" leftIcon={<ChildIcon />} onClick={doKidClick} />
            <MenuItem primaryText="Info" leftIcon={<InfoIcon />} onClick={doInfoClick} />
            <Divider />
            <MenuItem primaryText="Tilbake" leftIcon={<BackIcon />} onClick={closeGroup} />
        </div>);
    };

    return (<div>
        { currentGroupLinks(currentGroup) }
        <MenuItem primaryText="Ny gågruppe" leftIcon={<NewIcon />} onClick={doNew} />
    </div>);
};

export default DrawerContent;
