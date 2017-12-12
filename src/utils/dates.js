import { format } from 'fecha';

const getToday = (date) => {
    var now = new Date();
    now.setHours(0,0,0,0);
    return now;
};

export const getId = (date) => format(date, 'YYYYMMDD');

export const isTodayOrPast = (date) => {
    const today = getToday();
    return (date <= today);
};

export const isInPast = (date) => {
    const today = getToday();
    return (date < today);
};