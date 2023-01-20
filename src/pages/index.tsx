// import styles from '@/styles/Home.module.scss';
import HomePage from '@/components/HomePage/HomePage';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { CurrencyList } from 'models/Currency';
import { CurrencyProps } from 'models/Currency';

export default function Home({ currencies }: CurrencyProps) {
  return <HomePage currencies={currencies} />;
}
export async function getStaticProps() {
  const allFiats = await import('../../data/allFiats.json');

  return {
    props: {
      currencies: addFlagToCurrency(allFiats),
    },
  };
}
