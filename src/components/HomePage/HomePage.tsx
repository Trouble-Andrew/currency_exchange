import { InitialProps } from '@/pages';
import { Box } from '@mui/material';
import Converter from '../Converter/Converter';

const HomePage = ({ currencies, rates, amount, from, to }: InitialProps) => (
  <Box sx={{ pt: '10vh' }}>
    <Converter
      currencies={currencies}
      rates={rates}
      amount={amount}
      from={from}
      to={to}
    />
  </Box>
);

export default HomePage;
