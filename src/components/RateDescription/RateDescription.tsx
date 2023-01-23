import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface RateDescription {
  fromCurrencyName: string | null;
  toCurrencyName: string | null;
  date: string;
  value: string | number | null;
}

interface HydrationProps {
  from: string | null;
  to: string | null;
  date: string;
  value: string | number | null;
}

const RateDescription = ({
  fromCurrencyName,
  toCurrencyName,
  date,
  value,
}: RateDescription) => {
  const [hydrationProps, setHydrationProps] = useState<HydrationProps>({
    from: '',
    to: '',
    date: '',
    value: '',
  });

  useEffect(() => {
    setHydrationProps({
      from: fromCurrencyName,
      to: toCurrencyName,
      date,
      value,
    });
  }, [fromCurrencyName, toCurrencyName, date, value]);

  return (
    <Box>
      <Typography variant="body2" component="p">
        1 {hydrationProps.from} = {hydrationProps.value} {hydrationProps.to}
      </Typography>
      <Typography variant="body2" component="p">
        All data and information is provided “as is” for informational purposes
        only {hydrationProps.date}
      </Typography>
    </Box>
  );
};

export default RateDescription;
