// import styles from '@/styles/Home.module.scss';
import HomePage from '@/components/HomePage/HomePage';
import useCurrencyStore from '@/store/store';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { CurrencyProps } from 'models/Currency';
import { useEffect } from 'react';

function Home({ currencies }: CurrencyProps) {
  const { addCurrencies } = useCurrencyStore((state) => state);

  useEffect(() => {
    addCurrencies(currencies);
  }, [addCurrencies, currencies]);
  return <HomePage />;
}

export async function getStaticProps() {
  const allFiats = await import('../../data/allFiats.json');

  return {
    props: {
      currencies: addFlagToCurrency(allFiats.default),
    },
  };
}

export default Home;
