import { combineEpics } from 'redux-observable';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { closeDrawer, types, selectGroup } from './actions';
import 'rxjs';
import { dataToJS } from 'react-redux-firebase';
import { operations } from './index';

const noSelectedGroup = (store) => {
    const selectedGroup = store.getState().app.selectedGroup;
    return !selectedGroup || selectedGroup === '';
};

const closeDrawarOnLocationChangeEpic = (action$, store) => action$
    .ofType(LOCATION_CHANGE)
    .filter(() => store.getState().app.drawerOpen)
    .mapTo(closeDrawer());

const needSelectedGroupEpic = (action$, store) => action$
    .ofType(LOCATION_CHANGE)
    .filter(({ payload }) => payload.pathname.indexOf('/group') !== -1)
    .filter(() => noSelectedGroup(store))
    .mapTo(push(''));

const gotoSelectedGroupEpic = action$ => action$
    .ofType(types.selectGroup)
    .mapTo(operations.goHome1());

const goHomeEpic = (action$, store) => action$
    .ofType(types.goHome)
    .map(() => !noSelectedGroup(store))
    .map(isSelected => isSelected ? `/group/${store.getState().app.selectedGroup}` : '')
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
    joinGroupEpic,
//    needSelectedGroupEpic,
    goHomeEpic
);