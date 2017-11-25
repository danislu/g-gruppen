import { format } from 'fecha';

export const getId = (date) => format(date, 'YYYYMMDD');