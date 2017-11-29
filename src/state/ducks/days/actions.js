import { createActionCreator } from './../../../utils/actions';
const actionCreator = createActionCreator('days');

export const selectDay = actionCreator('select');
export const selectGroup = actionCreator('group');
export const registerWalker = actionCreator('registerWalker');
export const deregisterWalker = actionCreator('deregisterWalker');

export const createGroup = actionCreator('group/create');
