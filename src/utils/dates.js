import { format } from 'fecha';

export const getId = (date) => format(date, 'YYYYMMDD');

export const isInPast = (date) => {
    var now = new Date();
    now.setHours(0,0,0,0);
    return (date < now);
};