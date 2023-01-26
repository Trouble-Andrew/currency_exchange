export const convertData = (date: string) => {
  const dateObject = new Date(date);
  
  return `${dateObject.getUTCDate()}.${
    dateObject.getUTCMonth() + 1
  }.${dateObject.getFullYear()}`;
};
