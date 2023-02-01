import React, { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Chart from '../Chart/Chart';

const toggleStyles = { fontSize: '0.8rem', padding: '0.3rem 0.6rem' };

const ChartsBox = () => {
  const [interval, setInterval] = useState('month');

  const handleChange = (
    e: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setInterval(newAlignment);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        borderRadius: '5px',
        backgroundColor: 'var(--color-background-grey-dark)',
        // maxWidth: '45rem',
        minHeight: '22rem',
        p: '15px',
        m: '0 auto',
        mb: '1rem',
      }}
    >
      <ToggleButtonGroup
        color="primary"
        value={interval}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ alignSelf: 'start' }}
      >
        <ToggleButton value="month" sx={toggleStyles}>
          Month
        </ToggleButton>
        <ToggleButton value="half-year" sx={toggleStyles}>
          Half a year
        </ToggleButton>
        <ToggleButton value="year" sx={toggleStyles}>
          Year
        </ToggleButton>
      </ToggleButtonGroup>
      <Chart interval={interval} />
    </Box>
  );
};

export default ChartsBox;
