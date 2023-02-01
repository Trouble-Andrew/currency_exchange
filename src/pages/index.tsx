import HomePage from '@/components/HomePage/HomePage';
import { useGlobalContext } from '@/contexts';
import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { INITIAL_FROM_CURRENCY, INITIAL_TO_CURRENCY } from '../lib/constants';

export interface InitialProps {
  amount: string | number;
  from: string;
  to: string;
}

function Home({ amount, from, to }: InitialProps) {
  const { setAmount, setFrom, setTo } = useGlobalContext();

  useEffect(() => {
    setAmount(amount);
    setFrom(from);
    setTo(to);
  }, []);

  return <HomePage />;
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
