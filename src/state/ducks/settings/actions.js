import { createActionCreator } from './../../../utils/actions';

const actionCreator = createActionCreator('settings');

export const saveSettings = actionCreator('save');

