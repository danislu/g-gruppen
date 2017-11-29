
import { selectDay, selectGroup, registerWalker, deregisterWalker, createGroup } from './actions';
import reducer from './reducers';
export { rootEpic as epic } from './epics';

export default reducer;
export const operations = {
    createGroup,
    selectDay,
    selectGroup,
    registerWalker,
    deregisterWalker
};