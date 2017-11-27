
export const root = (state = 'ping', action) => {
    if (action.type === 'pong'){
        return state += "!";
    }
    return state;
};