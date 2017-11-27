import { combineEpics } from 'redux-observable';
import text, { epic as loginEpic } from './login';
import days, { epic as daysEpic } from './days';
import settings, { epic as settingEpic } from './settings';

export const reducers = { text, days, root };
export const epics = combineEpics(loginEpic, daysEpic, settingEpic);