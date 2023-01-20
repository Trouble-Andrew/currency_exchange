import { CurrencyList } from 'models/Currency';

export const addFlagToCurrency = (allFiats: CurrencyList) => {
  const requiredCurrencies = [];

  for (const fiat in allFiats) {
    switch (allFiats[fiat].currency_code) {
      case 'RUB':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'ru' });
        break;
      case 'USD':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'us' });
        break;
      case 'EUR':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'eu' });
        break;
      case 'GBP':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'gb' });
        break;
      case 'JPY':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'jp' });
        break;
      case 'TRY':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'tr' });
        break;
      case 'KZT':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'kz' });
        break;
      case 'UAH':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'ua' });
        break;
      case 'BYN':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'by' });
        break;
      case 'KGZ':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'kg' });
        break;
      case 'CNY':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'cn' });
        break;
      case 'GEL':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'ge' });
        break;
      case 'CHF':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'ch' });
        break;
      case 'PLN':
        requiredCurrencies.push({ ...allFiats[fiat], flag: 'pl' });
        break;
      default:
        break;
    }
  }

  return requiredCurrencies;
};
