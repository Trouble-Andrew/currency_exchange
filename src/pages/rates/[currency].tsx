import { CURRENCY_CODES } from '../constants';
import { Rate, Rates as RatesInterface } from 'models/Rates';
import { GetStaticPropsContext } from 'next';
import { CurrencyList } from 'models/Currency';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { Box } from '@mui/system';
import RatesTable from '@/components/RatesTable/RatesTable';
import { Typography } from '@mui/material';
import { convertData } from '@/utils/convertData';

interface Rates {
  rates: RatesInterface;
  base: string;
  currencies: CurrencyList;
  historical: Rate;
}

const Rates = ({ base, rates, currencies, historical }: Rates) => {
  console.log(historical);
  return (
    <Box>
      <Typography
        variant="h3"
        component="h2"
        sx={{ mb: '2rem', fontSize: { xs: '2.5rem', sm: '3rem' } }}
      >
        Current Rates
      </Typography>
      <Typography
        variant="caption"
        component="p"
        sx={{ opacity: '0.7', mb: { xs: '0', md: '-2.2rem' } }}
      >
        All data and information is provided “as is” for informational purposes
        only &#x2022; {convertData(rates[base].date)}
      </Typography>
      <RatesTable
        base={base}
        rates={rates}
        currencies={currencies}
        historical={historical}
      />
    </Box>
  );
};

export default Rates;

export async function getStaticProps(context: GetStaticPropsContext) {
  let currency = context.params?.currency;
  const allFiats = await import('../../../data/allFiats.json');
  const currenciesWithFlags = addFlagToCurrency(allFiats.default);
  const rubHistorical = await import('../../../data/historicalRub.json');

  // const historical = await fetch(
  //   'https://api.currencybeacon.com/v1/historical?api_key=678605141e3237b7e9c7a02a2edb15e3&base=RUB&symbols=USD,EUR,GBP,JPY,TRY,KZT,UAH,BYN,KGS,CNY,GEL,CHF,PLN&date=2023-01-26',
  // );
  // const historicalData = await historical.json();

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
      // historical: historicalData.response,
      historical: { ...rubHistorical },
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
