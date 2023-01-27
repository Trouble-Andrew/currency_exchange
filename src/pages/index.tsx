import { useEffect } from 'react';
// import styles from '@/styles/Home.module.scss';
import HomePage from '@/components/HomePage/HomePage';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { CurrencyProps } from 'models/Currency';
import { fetchLatestRates } from '@/utils/fetchLatestRates';
import { Rate, Rates } from 'models/Rates';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { INITIAL_FROM_CURRENCY, INITIAL_TO_CURRENCY } from './constants';

export interface InitialProps extends CurrencyProps {
  rates: Rates;
  amount: string | number;
  from: string;
  to: string;
}

function Home({ currencies, rates, amount, from, to }: InitialProps) {
  // console.log('INDEX STATE: ', state);
  // console.log('INDEX CURR: ', currencies);
  // console.log('INDEX RATES: ', rates);

  // useEffect(() => {
  //   // addCurrencies(currencies);

  //   for (const rate in rates) {
  //     addRate(rates[rate]);
  //   }
  // }, [addCurrencies, addRate, currencies, rates]);

  return (
    <HomePage
      currencies={currencies}
      rates={rates}
      amount={amount}
      from={from}
      to={to}
    />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const allFiats = await import('../../data/allFiats.json');
  const rubList = await import('../../data/allLatestRUBRRes.json');

  const { amount, from, to } = context.query;
  // console.log('amount: ', amount);
  // console.log('from: ', from);
  // console.log('to: ', to);

  // const usdRate = await import('../../data/allLatestUSDRes.json');
  // const serializeUsdRate = { ...usdRate };
  // useCurrencyStore.getState().addRate(serializeUsdRate.default.response);

  // fetchLatestRates();
  const serializeRubList = { [rubList.base]: { ...rubList } };

  // console.log(serializeRubList);

  // fetch('../../data/allLatestRUBRRes.json', {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     console.log(responseData);
  //   });

  const currenciesWithFlags = addFlagToCurrency(allFiats.default);

  // useCurrencyStore.getState().addCurrencies(currenciesWithFlags);
  // useCurrencyStore.getState().addRate(serializeRubList);

  return {
    props: {
      currencies: currenciesWithFlags,
      rates: serializeRubList,
      amount: amount ? amount : '1',
      from: from ? from : INITIAL_FROM_CURRENCY,
      to: to ? to : INITIAL_TO_CURRENCY,
    },
  };
}

export default Home;
