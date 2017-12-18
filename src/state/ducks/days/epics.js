import { combineEpics } from 'redux-observable';
import 'rxjs';
import { getId, isInPast } from './../../../utils/dates';

const registerWalkerEpic = (action$, store, { getFirebase }) => action$
    .ofType('days/registerWalker')
    .filter(({ payload }) => !isInPast(payload.day))
    .map(({payload}) => ({ 
        ...payload, 
        user : getFirebase().auth().currentUser
    }))
    .flatMap(({ id, day, user: { uid }}) => getFirebase().set(`/groups/${id}/days/${getId(day)}/walkers/${uid}`, true))
    .mapTo({ type: 'days/registerWalker/done'});

const deregisterWalkerEpic = (action$, store, { getFirebase }) => action$
    .ofType('days/deregisterWalker')
    .filter(({ payload }) => !isInPast(payload.day))
    .map(({payload}) => ({ 
        ...payload, 
        user : getFirebase().auth().currentUser
    }))
    .flatMap(({ id, day, user: { uid }}) => getFirebase().remove(`/groups/${id}/days/${getId(day)}/walkers/${uid}`))
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
        }).then(({ key }) => getFirebase().set(`groups/${key}/key`, key));
    })
    .mapTo({ type: 'group/create/done' });

const selectGroup = (action$, store, { history }) => action$
    .ofType('days/group')
    .do(({ payload }) => history.push('/info'))
    .mapTo({ type: 'days/group/done'});

export const rootEpic = combineEpics(
    createGroupEpic,
    registerWalkerEpic,
    deregisterWalkerEpic,
    selectGroup
);