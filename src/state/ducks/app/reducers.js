import { combineReducers } from 'redux';
import { createReducer } from './../../../utils/reducers';
import { types } from './actions';

const drawerOpen = createReducer(true, {
    [types.openDrawer]: () => true,
    [types.closeDrawer]: () => false,
});

export default combineReducers({
    drawerOpen    
});