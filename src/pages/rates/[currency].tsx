import { CURRENCY_CODES, MAIN_KEY, MAIN_URl } from '../constants';
import { Rate, Rates as RatesInterface } from 'models/Rates';
import { GetStaticPropsContext } from 'next';
import { CurrencyList } from 'models/Currency';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { Box } from '@mui/system';
import RatesTable from '@/components/RatesTable/RatesTable';
import { Typography } from '@mui/material';
import { convertData } from '@/utils/convertData';
import { memo } from 'react';
import { getCurrencySymbols } from '@/utils/getCurrencySymbols';

interface Rates {
  rates: RatesInterface;
  base: string;
  historical: Rate;
}

const Rates = memo(function Rates({ base, rates, historical }: Rates) {
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
      <RatesTable base={base} rates={rates} historical={historical} />
    </Box>
  );
});

export default Rates;

export async function getStaticProps(context: GetStaticPropsContext) {
  let baseCurrency = context.params?.currency as string;
  const otherCurrencies = getCurrencySymbols(baseCurrency);

  const rubHistorical = await import('../../../data/historicalRub.json');

  // const ratesResponse = await fetch(
  //   `${MAIN_URl}/latest?api_key=${MAIN_KEY}&base=${baseCurrency}&symbols=${otherCurrencies}`,
  // );
  const ratesResponse = await fetch(
    `https://gist.githubusercontent.com/Trouble-Andrew/f796c665bec4e6ca919285267d06ce84/raw/ed902c9a133f4ca946644da3c8319d89f1764903/${baseCurrency.toLowerCase()}.json`,
  );
  const ratesJson = await ratesResponse.json();
  const rates = await ratesJson.response;

  // console.log(rates);

  // const historical = await fetch(
  //   'https://api.currencybeacon.com/v1/historical?api_key=678605141e3237b7e9c7a02a2edb15e3&base=RUB&symbols=USD,EUR,GBP,JPY,TRY,KZT,UAH,BYN,KGS,CNY,GEL,CHF,PLN&date=2023-01-26',
  // );
  // const historicalData = await historical.json();

  const rubList = await import('../../../data/allLatestRUBRRes.json');

  if (baseCurrency) {
    baseCurrency = String(baseCurrency).toUpperCase();
  }

  // const usdRate = await import('../../data/allLatestUSDRes.json');
  // const serializeUsdRate = { ...usdRate };
  // useCurrencyStore.getState().addRate(serializeUsdRate.default.response);

  // fetchLatestRates();
  const serializeRubList = { [rubList.base]: { ...rubList } };

  return {
    props: {
      // rates: serializeRubList,
      rates: { [rates.base]: rates },
      base: baseCurrency,
      // historical: historicalData.response,
      historical: { ...rubHistorical },
    },
    revalidate: 1,
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
