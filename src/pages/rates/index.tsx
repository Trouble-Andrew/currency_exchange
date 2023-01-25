import useCurrencyStore from '@/store/store';
import { Rate } from 'models/Rates';

interface Rates {
  rates: Rate[];
  rates: string;
}

const Rates = ({ rates, base }: Rates) => {
  console.log(base);
  return <div>{base}</div>;
};

export default Rates;

export async function getServerSideProps() {
  if (Object.keys(useCurrencyStore.getState().rates).length === 0) {
    const rubList = await import('../../../data/allLatestRUBRRes.json');
    const serializeRubList = { ...rubList };
    useCurrencyStore.getState().addRate(serializeRubList);
  }

  // useCurrencyStore.getState().addRate(serializeRubList);

  console.log(useCurrencyStore.getState());

  return {
    props: {
      rates: useCurrencyStore.getState().rates,
      base: useCurrencyStore.getState().from,
    },
  };
}
