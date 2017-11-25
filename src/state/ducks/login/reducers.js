

export const text = (state = 'ping', action) => {
    if (action.type === 'pong'){
        return state += "!";
    }
    return state;
};