import { padTo2Digits } from './padTo2Digits';

export const convertData = (date: string) => {
  const dateObject = new Date(date);

  return `${padTo2Digits(dateObject.getUTCDate())}.${padTo2Digits(
    dateObject.getUTCMonth() + 1,
  )}.${dateObject.getFullYear()}`;
};
