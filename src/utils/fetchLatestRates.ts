import wretch from 'wretch';

// base: string

export const fetchLatestRates = () => {
  return wretch('../../data/allLatestRUBRRes.json')
    .get()
    .json((json) => {
      // Do stuff with the parsed json
      console.log(json);
    });
};
