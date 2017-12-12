
export const types = {
    openDrawer: 'app/drawer/open',
    closeDrawer: 'app/drawer/close',
};

export const openDrawer = () => ({ type: types.openDrawer });
export const closeDrawer = () => ({ type: types.closeDrawer });