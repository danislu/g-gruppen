import { combineEpics } from 'redux-observable';
import text, { epic as loginEpic } from './login';
import days, { epic as daysEpic } from './days';

export const reducers = { text, days };
export const epics = combineEpics(loginEpic, daysEpic);