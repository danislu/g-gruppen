import { combineEpics } from 'redux-observable';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { closeDrawer, types, selectGroup } from './actions';
import 'rxjs';
import { dataToJS } from 'react-redux-firebase';

const closeDrawarOnLocationChangeEpic = (action$, store) => action$
    .ofType(LOCATION_CHANGE)
    .filter(() => store.getState().app.drawerOpen)
    .mapTo(closeDrawer());

const gotoSelectedGroupEpic = (action$, store, { getFirebase }) => action$
    .ofType(types.selectGroup)
    .map(({ payload }) => payload === '' ? '' : `group/${payload}`)
    .map(path => push(path));

const joinGroupEpic = (action$, store, { getFirebase }) => action$
    .ofType(types.joinGroup)
    .map(({ payload}) => ({
        key: payload.key,
        user: getFirebase().auth().currentUser.uid
    }))
    .flatMap(({ key, user }) => getFirebase()
        .set(`/groups/${key}/users/${user}`, true)
        .then(() => {
            return key;
        }))
    .map(key => {
        return selectGroup(key);
    });

export const rootEpic = combineEpics(
    closeDrawarOnLocationChangeEpic,
    gotoSelectedGroupEpic,
    joinGroupEpic
);