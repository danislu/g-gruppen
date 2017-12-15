import { combineEpics } from 'redux-observable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { closeDrawer } from './actions';
import 'rxjs';

const closeDrawarOnLocationChangeEpic = action$ => action$
    .ofType(LOCATION_CHANGE)
    .mapTo(closeDrawer());

export const rootEpic = combineEpics(
    closeDrawarOnLocationChangeEpic
);