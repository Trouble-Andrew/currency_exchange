import { useEffect } from 'react';
// import styles from '@/styles/Home.module.scss';
import HomePage from '@/components/HomePage/HomePage';
import useCurrencyStore from '@/store/store';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { CurrencyProps } from 'models/Currency';
import { fetchLatestRates } from '@/utils/fetchLatestRates';
import { Rate, Rates } from 'models/Rates';

interface InitialProps extends CurrencyProps {
  rates: Rates;
}

function Home({ currencies, rates }: InitialProps) {
  const { addCurrencies, addRate } = useCurrencyStore((state) => state);

  useEffect(() => {
    addCurrencies(currencies);

    for (const rate in rates) {
      addRate(rates[rate]);
    }
  }, [addCurrencies, addRate, currencies, rates]);

  return <HomePage />;
}

export async function getServerSideProps() {
  const allFiats = await import('../../data/allFiats.json');
  const rubList = await import('../../data/allLatestRUBRRes.json');

  // const usdRate = await import('../../data/allLatestUSDRes.json');
  // const serializeUsdRate = { ...usdRate };
  // useCurrencyStore.getState().addRate(serializeUsdRate.default.response);

  // fetchLatestRates();
  const serializeRubList = { ...rubList };

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

  useCurrencyStore.getState().addCurrencies(currenciesWithFlags);
  useCurrencyStore.getState().addRate(serializeRubList);

  return {
    props: {
      currencies: useCurrencyStore.getState().currencies,
      rates: useCurrencyStore.getState().rates,
    },
  };
}

export default Home;
