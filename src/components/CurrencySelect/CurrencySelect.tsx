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

interface CurrencySelectProps extends CurrencyProps {
  initialCurrency?: string;
  initialValue?: string | number;
}

const CurrencySelect = ({
  currencies,
  initialValue,
  initialCurrency,
}: CurrencySelectProps) => {
  const [currency, setCurrency] = useState('');
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (initialCurrency) {
      setCurrency(initialCurrency);
    }
  }, [initialCurrency]);

  const changeSelectHandler = (e: SelectChangeEvent) => {
    setCurrency(e.target.value as string);
  };

  const changeInputHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    e.preventDefault();

    // @ts-ignore
    const enteredValue = e.nativeEvent.data;

    console.log(e);

    if (
      !Number.isNaN(parseFloat(e.currentTarget.value)) ||
      enteredValue === 'e' ||
      enteredValue === null
    ) {
      setValue(e.currentTarget.value);
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
                  >
                    {currency.currency_code}
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
