// import { useGlobalContext } from '@/contexts';
import { Box } from '@mui/material';
import Converter from '../Converter/Converter';

import { memo } from 'react';
import ChartsBox from '../ChartsBox/ChartsBox';

const HomePage = memo(function HomePage() {
  // const { from, to, rates } = useGlobalContext();

  return (
    <Box sx={{ pt: { xs: '2vh', sm: '5vh' } }}>
      <Converter sx={{ mb: '1.5rem' }} />
      <ChartsBox />
    </Box>
  );
});

export default HomePage;
