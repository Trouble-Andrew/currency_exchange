import HomePage from '@/components/HomePage/HomePage';
import { CurrencyProps } from 'models/Currency';
import { Rates } from 'models/Rates';
import { GetServerSidePropsContext } from 'next';
import { INITIAL_FROM_CURRENCY, INITIAL_TO_CURRENCY } from '../lib/constants';

export interface InitialProps {
  amount: string | number;
  from: string;
  to: string;
}

function Home({ amount, from, to }: InitialProps) {
  // console.log('INDEX STATE: ', state);
  // console.log('INDEX CURR: ', currencies);
  // console.log('INDEX RATES: ', rates);

  // useEffect(() => {
  //   // addCurrencies(currencies);

  //   for (const rate in rates) {
  //     addRate(rates[rate]);
  //   }
  // }, [addCurrencies, addRate, currencies, rates]);

  return <HomePage amount={amount} from={from} to={to} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { amount, from, to } = context.query;

  return {
    props: {
      amount: amount ? amount : '1',
      from: from ? from : INITIAL_FROM_CURRENCY,
      to: to ? to : INITIAL_TO_CURRENCY,
    },
  };
}

export default Home;
