import { saveSettings } from './actions';
import { root } from './reducers';
export { rootEpic as epic } from './epics';

export default root;
export const opertions = {
    saveSettings
};