import useCurrencyStore from '@/store/store';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { CurrencyProps } from 'models/Currency';
import React from 'react';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const Converter = () => {
  const { from, to, amount, rates, currencies, toggle, addRate } =
    useCurrencyStore((state) => state);

  // console.log(from);
  // console.log(to);
  // console.log(amount);

  const handleToggle = async () => {
    console.log(from);
    console.log(to);
    toggle();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CurrencySelect
        currencies={currencies}
        initialValue={amount}
        initialCurrency={from}
      />
      <IconButton
        color="inherit"
        onClick={handleToggle}
        sx={{
          m: '0 1rem',
        }}
      >
        <SwapHorizIcon />
      </IconButton>
      <CurrencySelect
        currencies={currencies}
        initialCurrency={to}
        initialValue={amount}
      />
    </Box>
  );
};

export default Converter;
