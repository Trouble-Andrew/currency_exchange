import { Container } from '@mui/material';
import { CurrencyList } from 'models/Currency';
import Link from 'next/link';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import { CurrencyProps } from 'models/Currency';

const HomePage = ({ currencies }: CurrencyProps) => (
  <CurrencySelect currencies={currencies} />
);

export default HomePage;
