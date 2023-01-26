import { CURRENCY_CODES } from '../constants';
import { Rates as RatesInterface } from 'models/Rates';
import { GetStaticPropsContext } from 'next';
import { Currency, CurrencyList } from 'models/Currency';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { Box } from '@mui/system';
import CurrencyTable from '@/components/CurrencyTable/CurrencyTable';
import { Typography } from '@mui/material';
import { convertData } from '@/utils/convertData';

interface Rates {
  rates: RatesInterface;
  base: string;
  currencies: CurrencyList;
}

const Rates = ({ base, rates, currencies }: Rates) => {
  return (
    <Box>
      <Typography variant="h3" component="h2" sx={{ mb: '2rem' }}>
        Current Rates
      </Typography>
      <Typography variant="caption" component="p" sx={{ opacity: '0.7', mb: '0.7rem' }}>
        All data and information is provided “as is” for informational purposes
        only &#x2022; {convertData(rates[base].date)}
      </Typography>
      <CurrencyTable base={base} rates={rates} currencies={currencies} />
    </Box>
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
