import { createActionCreator } from './../../../utils/actions';

const actionCreator = createActionCreator('login');

export const logIn = actionCreator('login');
export const logOut = actionCreator('logout');

