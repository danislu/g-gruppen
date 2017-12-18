import React from 'react';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import ChildIcon from 'material-ui/svg-icons/places/child-care';
import InfoIcon from 'material-ui/svg-icons/action/info';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import NewIcon from 'material-ui/svg-icons/content/create';
import ListIcon from 'material-ui/svg-icons/action/list';
import { withRouter } from 'react-router';
import { MenuItem, Menu, Divider } from 'material-ui';

const DrawerContent = ({ currentGroup, doWalkerClick, doKidClick, doInfoClick, closeGroup, doNew, goHome }) => {
    const currentGroupLinks = (group) => {
        if (!group) {
            return null;
        }

        return (<div>
            <MenuItem primaryText="Info" leftIcon={<InfoIcon />} onClick={doInfoClick} />
            <MenuItem primaryText="Følgere" leftIcon={<WalkIcon />} onClick={doWalkerClick} />
            <MenuItem disabled={true} primaryText="Deltagere" leftIcon={<ChildIcon />} onClick={doKidClick} />
        </div>);
    };

    return (<div>
        { currentGroupLinks(currentGroup) }
        <Divider />
        <MenuItem primaryText="Alle" leftIcon={<ListIcon />} onClick={closeGroup} />
        <MenuItem disabled={true} primaryText="Ny gågruppe" leftIcon={<NewIcon />} onClick={doNew} />
    </div>);
};

export default DrawerContent;
