import { CURRENCY_CODES } from '../constants';
import { Rate } from 'models/Rates';
import { GetStaticPropsContext } from 'next';
import { Currency, CurrencyList } from 'models/Currency';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';

interface Rates {
  rates: Rate[];
  base: string;
  currencies: CurrencyList;
}

const Rates = ({ base, rates, currencies }: Rates) => {
  console.log(currencies);
  console.log(CURRENCY_CODES);
  console.log(rates[base].rates);
  // const serializeRates = Object.entries(rates[base].rates).map((e) => ({
  //   [e[0]]: e[1],
  // }));

  // console.log(serializeRates);
  return (
    <div>
      {CURRENCY_CODES.map((code) => (
        <p key={code}>
          {currencies[code]?.currency_name} - {code} -{' '}
          {rates[base]?.rates[code]}
        </p>
      ))}
    </div>
  );
};

export default Rates;

export async function getStaticProps(context: GetStaticPropsContext) {
  let currency = context.params?.currency;
  const allFiats = await import('../../../data/allFiats.json');
  const currenciesWithFlags = addFlagToCurrency(allFiats.default);

  const rubList = await import('../../../data/allLatestRUBRRes.json');

  if (currency) {
    currency = String(currency).toUpperCase();
  }

  // const usdRate = await import('../../data/allLatestUSDRes.json');
  // const serializeUsdRate = { ...usdRate };
  // useCurrencyStore.getState().addRate(serializeUsdRate.default.response);

  // fetchLatestRates();
  const serializeRubList = { [rubList.base]: { ...rubList } };
  console.log(currency);
  console.log(currenciesWithFlags);

  return {
    props: {
      rates: serializeRubList,
      base: currency,
      currencies: currenciesWithFlags,
    },
  };
}

export async function getStaticPaths() {
  const allPaths = CURRENCY_CODES.map((currency) => {
    return {
      params: { currency: currency.toLowerCase() },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}
