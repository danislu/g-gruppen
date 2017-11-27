import { combineEpics } from 'redux-observable';
import 'rxjs';
import { getId, isInPast } from './../../../utils/dates';

const registerWalkerEpic = (action$, store, { getFirebase }) => action$
    .ofType('days/registerWalker')
    .filter(({ payload }) => {
        var now = new Date();
        now.setHours(0,0,0,0);
        return (payload >= now);
    })
    .map(({payload}) => ({ 
        date: payload, 
        user : getFirebase().auth().currentUser
    }))
    .flatMap(({ date, user: { uid }}) => getFirebase().set(`days/${getId(date)}/walkers/${uid}`, true))
    .mapTo({ type: 'days/registerWalker/done'});

const deregisterWalkerEpic = (action$, store, { getFirebase }) => action$
    .ofType('days/deregisterWalker')
    .filter(({ payload }) => !isInPast(payload))
    .map(({payload}) => ({ 
        date: payload, 
        user : getFirebase().auth().currentUser
    }))
    .flatMap(({ date, user: { uid }}) => getFirebase().remove(`days/${getId(date)}/walkers/${uid}`))
    .mapTo({ type: 'days/deregisterWalker/done'});

export const rootEpic = combineEpics(
    registerWalkerEpic,
    deregisterWalkerEpic
);