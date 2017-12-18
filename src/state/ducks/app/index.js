
import { openDrawer, closeDrawer, selectGroup, clearSelectedGroup, joinGroup, goHome1 } from './actions';
import reducer from './reducers';
export { rootEpic as epic } from './epics';

export default reducer;
export const operations = {
    goHome1,
    openDrawer,
    closeDrawer,
    selectGroup,
    clearSelectedGroup,
    joinGroup
};