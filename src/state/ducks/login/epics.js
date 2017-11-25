import { combineEpics } from 'redux-observable'
import 'rxjs';

const pingEpic = (action$, getState, { getFirebase }) => {
    return action$
        .ofType('login/ping')
        .do(({type}) => console.log(type))
        .mapTo({ type: 'pong' });
}

const loginEpic = (action$, getState, { getFirebase }) => {
    return action$
        .ofType('login/login')
        .flatMap(() => getFirebase().login({ 
            provider: 'facebook',
            type: 'popup'
        }))
        .mapTo({ type: 'login/login/done'});
};

const logoutEpic = (action$, getState, { getFirebase }) => action$
    .ofType('login/logout')
    .flatMap(() => getFirebase().logout())
    .mapTo({ type: 'login/logout/done' });

export const rootEpic = combineEpics(
    pingEpic,
    loginEpic,
    logoutEpic  
);