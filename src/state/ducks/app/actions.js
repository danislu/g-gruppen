
export const types = {
    openDrawer: 'app/drawer/open',
    closeDrawer: 'app/drawer/close',
    selectGroup: 'app/selectGroup',
    joinGroup: 'app/joinGroup',
    goHome: 'app/goHome'
};

export const openDrawer = () => ({ type: types.openDrawer });
export const closeDrawer = () => ({ type: types.closeDrawer });
export const selectGroup = (payload) => ({ type: types.selectGroup, payload });
export const clearSelectedGroup = () => selectGroup('');
export const joinGroup = (payload) => ({ type: types.joinGroup, payload });
export const goHome = () => ({ type: types.goHome });