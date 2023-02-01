import { useGlobalContext } from '@/contexts';
import { InitialProps } from '@/pages';
import { Box } from '@mui/material';
import Converter from '../Converter/Converter';

import { memo } from 'react';
import ChartsBox from '../ChartsBox/ChartsBox';

const HomePage = memo(function HomePage() {
  const { from, to, rates } = useGlobalContext();

  // console.log('FROM: ', from);
  // console.log('TO: ', to);
  // console.log(rates);

  return (
    <Box sx={{ pt: { xs: '2vh', sm: '5vh' } }}>
      <ChartsBox />
      <Converter />
    </Box>
  );
});

export default HomePage;
