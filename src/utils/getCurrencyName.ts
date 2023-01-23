import { Currency } from 'models/Currency';

export const getCurrencyName = (code: string, currencies: Currency[]) => {
  const foundedCurrency = currencies.find(
    (currency) => currency.currency_code === code,
  );

  if (foundedCurrency) {
    return foundedCurrency.currency_name;
  } else {
    return null;
  }
};
