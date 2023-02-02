import { convertData } from '@/utils/convertData';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface RateDescription {
  fromCurrencyName: string | null;
  toCurrencyName: string | null;
  date: string;
  value: string | number | null;
}

const RateDescription = ({
  fromCurrencyName,
  toCurrencyName,
  date,
  value,
}: RateDescription) => {
  return (
    <Box>
      <Typography variant="body2" component="p" sx={{ mb: '0.2rem' }}>
        {`1 ${fromCurrencyName} ${value ? `= ${value} ${toCurrencyName}` : ''}`}
      </Typography>
      <Typography variant="caption" component="p" sx={{ color: '#ffffffb3' }}>
        All data and information is provided “as is” for informational purposes
        only &#x2022; {date && convertData(date)}
      </Typography>
    </Box>
  );
};

export default RateDescription;
