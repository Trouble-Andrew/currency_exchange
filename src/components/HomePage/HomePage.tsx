import { InitialProps } from '@/pages';
import Converter from '../Converter/Converter';

const HomePage = ({ currencies, rates, amount, from, to }: InitialProps) => (
  <Converter
    currencies={currencies}
    rates={rates}
    amount={amount}
    from={from}
    to={to}
  />
);

export default HomePage;
