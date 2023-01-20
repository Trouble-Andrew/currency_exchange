import useCurrencyStore from '@/store/store';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { CurrencyProps } from 'models/Currency';
import React from 'react';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const Converter = () => {
  const { from, to, amount, currencies, toggle } = useCurrencyStore(
    (state) => state,
  );

  // console.log(from);
  // console.log(to);
  // console.log(amount);

  const handleToggle = () => {
    console.log(from);
    console.log(to);
    toggle();
  };

  return (
    <Box>
      <CurrencySelect
        currencies={currencies}
        initialValue={amount}
        initialCurrency={from}
      />
      <IconButton color="inherit" onClick={handleToggle}>
        <SwapHorizIcon />
      </IconButton>
      <CurrencySelect currencies={currencies} initialCurrency={to} />
    </Box>
  );
};

export default Converter;
