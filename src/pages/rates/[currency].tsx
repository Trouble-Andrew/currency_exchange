import { memo } from 'react';
import { CURRENCY_CODES } from '../../lib/constants';
import { Rate, Rates as RatesInterface } from 'models/Rates';
import { GetStaticPropsContext } from 'next';
import { Box } from '@mui/system';
import RatesTable from '@/components/RatesTable/RatesTable';
import { Typography } from '@mui/material';
import { convertData } from '@/utils/convertData';
import { getCurrencySymbols } from '@/utils/getCurrencySymbols';
import { formatDate } from '@/utils/formatDate';
import { getPreviousDay } from '@/utils/getPreviousDay';

interface Rates {
  rates: RatesInterface;
  base: string;
  historical: Rate;
}

const Rates = function Rates({ base, rates, historical }: Rates) {
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
};

export default Rates;

export async function getStaticProps(context: GetStaticPropsContext) {
  let baseCurrency = context.params?.currency as string;
  const otherCurrencies = getCurrencySymbols(baseCurrency);
  const previousDate = formatDate(getPreviousDay());

  const ratesResponse = await fetch(
    `${process.env.MAIN_URL}/latest?api_key=${process.env.MAIN_KEY}&base=${baseCurrency}&symbols=${otherCurrencies}`,
  );

  const ratesJson = await ratesResponse.json();
  const rates = await ratesJson.response;

  const historical = await fetch(
    `${process.env.MAIN_URL}/historical?api_key=${process.env.MAIN_KEY}&base=${baseCurrency}&symbols=${otherCurrencies}&date=${previousDate}`,
  );
  const historicalData = await historical.json();

  if (baseCurrency) {
    baseCurrency = String(baseCurrency).toUpperCase();
  }

  return {
    props: {
      rates: { [rates.base]: rates },
      base: baseCurrency,
      historical: historicalData.response,
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
