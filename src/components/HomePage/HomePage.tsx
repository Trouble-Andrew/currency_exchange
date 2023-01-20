import { Container } from '@mui/material';
import { CurrencyList } from 'models/Currency';
import Link from 'next/link';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import { CurrencyProps } from 'models/Currency';
import Converter from '../Converter/Converter';

const HomePage = () => <Converter />;

export default HomePage;
