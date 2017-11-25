import { logIn, logOut } from './actions';
import { text } from './reducers';
export { rootEpic as epic } from './epics';

export default text;
export const opertions = {
    logIn,
    logOut
};