export const createActionCreator = (prefix) => (type) => (payload) => ({ type: `${prefix}/${type}`, payload });
