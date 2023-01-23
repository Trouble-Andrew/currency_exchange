import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CurrencyProps } from 'models/Currency';
import {
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';

interface CurrencySelectProps extends CurrencyProps {
  initialCurrency?: string;
  initialValue?: string | number;
  changeValueHandler: (value: number | string) => void;
  changeCurrencyHandler: (currency: string) => void;
}

const CurrencySelect = ({
  currencies,
  initialValue,
  initialCurrency,
  changeValueHandler,
  changeCurrencyHandler,
}: CurrencySelectProps) => {
  const [currency, setCurrency] = useState('');
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (initialCurrency) {
      setCurrency(initialCurrency);
    }
    setValue(initialValue);
  }, [initialCurrency, initialValue]);

  const changeSelectHandler = (e: SelectChangeEvent) => {
    const currency = e.target.value;

    setCurrency(currency as string);
    changeCurrencyHandler(currency);
  };

  const changeInputHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    e.preventDefault();

    // @ts-ignore
    const enteredValue = e.nativeEvent.data;

    if (
      !Number.isNaN(parseFloat(e.currentTarget.value)) ||
      enteredValue === 'e' ||
      enteredValue === null
    ) {
      const value = e.currentTarget.value;
      setValue(value);
      changeValueHandler(value);
    }
  };

  return (
    <>
      <FormControl variant="standard">
        {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
        <OutlinedInput
          id="outlined-adornment-password"
          type={'text'}
          value={value}
          onChange={changeInputHandler}
          inputProps={{
            type: 'number',
            min: '0',
          }}
          sx={{
            pr: '0',
            '&:hover': {
              '.MuiSelect-select fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23) !important',
                // background: 'red',
              },
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                label="Age"
                onChange={changeSelectHandler}
                sx={{
                  '& .MuiInputBase-input': {
                    pt: '0',
                    pb: '0',
                    pl: '1.1rem',
                    // background: 'red',
                    display: 'grid',
                    placeContent: 'center',
                  },
                  '& fieldset': {
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderRadius: '0',
                  },
                  '&.Mui-focused': {
                    fieldset: {
                      borderColor: 'rgba(255, 255, 255, 0.23) !important',
                    },
                  },
                }}
              >
                {currencies.map((currency) => (
                  <MenuItem
                    value={currency.currency_code}
                    key={currency.currency_code}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CurrencyFlag currency={currency} />
                  </MenuItem>
                ))}
              </Select>
            </InputAdornment>
          }
          // label="Password"
        />
      </FormControl>
    </>
  );
};

export default CurrencySelect;
