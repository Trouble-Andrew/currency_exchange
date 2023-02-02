import React, { useState } from 'react';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from '@mui/material';
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
          1 Month
        </ToggleButton>
        <ToggleButton value="half-year" sx={toggleStyles}>
          6 Months
        </ToggleButton>
        <ToggleButton value="year" sx={toggleStyles}>
          1 Year
        </ToggleButton>
      </ToggleButtonGroup>
      <Chart interval={interval} />
      <Typography
        variant="caption"
        component="p"
        sx={{ color: '#ffffffb3', mt: '1rem', alignSelf: 'start' }}
      >
        Disclaimer: The data is presented over the time interval from January
        1st, 2022 to January 30th, 2023, as this type of data is available only
        in paid tariff plans.
      </Typography>
    </Box>
  );
};

export default ChartsBox;
