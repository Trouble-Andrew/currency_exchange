import { CurrencyList } from 'models/Currency';

export const addFlagToCurrency = (allFiats: CurrencyList) => {
  const requiredCurrencies = {} as CurrencyList;

  for (const fiat in allFiats) {
    switch (allFiats[fiat].currency_code) {
      case 'RUB':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'ru' };
        break;
      case 'USD':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'us' };
        break;
      case 'EUR':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'eu' };
        break;
      case 'GBP':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'gb' };
        break;
      case 'JPY':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'jp' };
        break;
      case 'TRY':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'tr' };
        break;
      case 'KZT':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'kz' };
        break;
      case 'UAH':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'ua' };
        break;
      case 'BYN':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'by' };
        break;
      case 'KGS':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'kg' };
        break;
      case 'CNY':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'cn' };
        break;
      case 'GEL':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'ge' };
        break;
      case 'CHF':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'ch' };
        break;
      case 'PLN':
        requiredCurrencies[fiat] = { ...allFiats[fiat], flag: 'pl' };
        break;
      default:
        break;
    }
  }

  return requiredCurrencies;
};
