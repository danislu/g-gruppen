
import { selectDay, registerWalker, deregisterWalker } from './actions';
import reducer from './reducers';
export { rootEpic as epic } from './epics';

export default reducer;
export const operations = {
    selectDay,
    registerWalker,
    deregisterWalker
};