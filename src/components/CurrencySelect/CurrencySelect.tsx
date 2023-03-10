import React, { useEffect, useState, memo } from 'react';
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

const CurrencySelect = memo(function CurrencySelect({
  currencies,
  initialValue,
  initialCurrency,
  changeValueHandler,
  changeCurrencyHandler,
}: CurrencySelectProps) {
  const [currency, setCurrency] = useState('');
  const [value, setValue] = useState(initialValue);

  const currenciesArray = Object.entries(currencies).map((e) => e[1]);

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
    const firstChar = e.currentTarget.value[0];
    const secondChar = e.currentTarget.value[1];

    if (
      firstChar === '0' &&
      enteredValue === '0' &&
      e.currentTarget.value.length > 1 &&
      e.currentTarget.value.length < 3
    ) {
      return;
    }

    if (
      firstChar === '0' &&
      secondChar !== '.' &&
      e.currentTarget.value.length > 1
    ) {
      setValue(e.currentTarget.value.replace('0', ''));
      return;
    }

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
        <OutlinedInput
          id="outlined-adornment-password"
          type={'number'}
          value={value}
          onChange={changeInputHandler}
          inputProps={{
            type: 'number',
            min: '0',
            inputMode: 'decimal',
          }}
          sx={{
            fontSize: { xs: '1.5rem' },
            pr: '0',
            '&:hover': {
              '.MuiSelect-select fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23) !important',
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
                    mt: '8px',
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
                {currenciesArray.map((currency) => (
                  <MenuItem
                    value={currency.currency_code}
                    key={currency.currency_code}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      backfaceVisibility: 'hidden',
                      fontFamily: 'var(--font-poppins)',
                    }}
                  >
                    <CurrencyFlag currency={currency} />
                  </MenuItem>
                ))}
              </Select>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
});

export default CurrencySelect;
