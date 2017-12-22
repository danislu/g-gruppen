import React from 'react';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import ChildIcon from 'material-ui/svg-icons/places/child-care';
import InfoIcon from 'material-ui/svg-icons/action/info';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { MenuItem, Menu, Divider } from 'material-ui';

const DrawerContent = ({ doWalkerClick, doKidClick, doInfoClick }) => {
    return (<div>
        <MenuItem primaryText="Info" leftIcon={<InfoIcon />} onClick={doInfoClick} />
        <MenuItem primaryText="Følgere" leftIcon={<WalkIcon />} onClick={doWalkerClick} />
        <MenuItem disabled={true} primaryText="Deltagere" leftIcon={<ChildIcon />} onClick={doKidClick} />
        <Divider />
    </div>);
};

export default DrawerContent;
