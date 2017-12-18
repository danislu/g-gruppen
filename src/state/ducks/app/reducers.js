import { combineReducers } from 'redux';
import { createReducer } from './../../../utils/reducers';
import { types } from './actions';

const drawerOpen = createReducer(true, {
    [types.openDrawer]: () => true,
    [types.closeDrawer]: () => false,
});

const selectedGroup = createReducer('', {
    [types.selectGroup]: (state, { payload }) => payload
})

export default combineReducers({
    drawerOpen,
    selectedGroup
});