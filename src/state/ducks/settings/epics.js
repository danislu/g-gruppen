import { combineEpics } from 'redux-observable'
import 'rxjs';

const saveSettingsEpic = (action$, getState, { getFirebase }) => action$
    .ofType('settings/save')
    .do(action => console.log(action))
    .map(({payload}) => ({ 
        data: payload,
        user: getFirebase().auth().currentUser
    }))
    .flatMap(({ data, user: { uid }}) => getFirebase().update(`users/${uid}`, data))
    .mapTo({ type: 'settings/save/done' });

export const rootEpic = combineEpics(
    saveSettingsEpic
);