import { CurrencyList } from 'models/Currency';

export const getCurrencyName = (code: string, currencies: CurrencyList) => {
  const foundedCurrency = currencies[code];

  if (foundedCurrency) {
    return foundedCurrency.currency_name;
  } else {
    return null;
  }
};
