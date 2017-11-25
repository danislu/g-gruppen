import { combineReducers } from 'redux';
import { createReducer } from './../../../utils/reducers';

const selected = createReducer(new Date(), {
    'days/select': (state, { payload }) => payload
});

export default combineReducers({
    selected
});