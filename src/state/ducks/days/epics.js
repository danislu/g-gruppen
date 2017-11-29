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

const createGroupEpic = (action$, store, { getFirebase }) => action$
    .ofType('days/group/create')
    .map(({ payload }) => ({
        payload,
        creator: getFirebase().auth().currentUser.uid
    }))
    .flatMap(({ payload, creator }) => {
        const { name, description, inviteOnly, time, ...weekdays } = payload;
        return getFirebase().push(`groups`, { 
            name, 
            description, 
            inviteOnly, 
            time, 
            weekdays, 
            creator, 
            created: new Date(),
            users: { 
                [creator]: true 
            }
        })
    })
    .mapTo({ type: 'group/create/done'});


export const rootEpic = combineEpics(
    createGroupEpic,
    registerWalkerEpic,
    deregisterWalkerEpic
);