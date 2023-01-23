import { Rates } from 'models/Rates';

export const getCurrentRate = (from: string, to: string, rates: Rates) => {
  let currentRate = rates[from];

  if (currentRate) {
    return rates[from].rates[to];
  } else {
    return null;
  }
};
