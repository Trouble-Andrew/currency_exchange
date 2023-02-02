import { Button, CircularProgress, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState, memo } from 'react';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RateDescription from '../RateDescription/RateDescription';
import { getCurrencyName } from '@/utils/getCurrencyName';
import { getCurrentRate } from '@/utils/getCurrentRate';
import { calculate } from '@/utils/calculate';
import { useRouter } from 'next/router';
import { SxProps, Theme } from '@mui/material/styles';
import {
  INITIAL_FROM_CURRENCY,
  INITIAL_TO_CURRENCY,
  CURRENCIES,
} from '@/lib/constants';
import { useGlobalContext } from '@/contexts';
import useRate from '@/hooks/useRate';

interface ConverterProps {
  sx?: SxProps<Theme>;
}

const Converter = memo(function Converter({ sx = [] }: ConverterProps) {
  const { push, query, asPath } = useRouter();

  const currencies = CURRENCIES;

  const {
    amount,
    from,
    to,
    rates,
    addRate,
    setFrom,
    setAmount,
    setQuery,
    setTo,
    toggle,
    reset,
  } = useGlobalContext();

  const { rate, isLoading, isError } = useRate(from);

  let currentRate = getCurrentRate(from, to, rates);

  const [fromValue, setFromValue] = useState(amount);
  const [toValue, setToValue] = useState(
    calculate(amount, currentRate !== null ? currentRate : 1),
  );

  useEffect(() => {
    if (currentRate) {
      setToValue(calculate(fromValue, currentRate));
    } else {
      const fetchRate = async () => {
        if (!isLoading && !isError) {
          addRate(rate.response);
        }
      };

      if (!currentRate) {
        fetchRate();
      }
    }
  }, [from, to, isLoading, isError, currentRate]);

  useEffect(() => {
    setQuery(asPath);
  }, [asPath, setQuery]);

  const handleToggle = async () => {
    toggle();
  };

  const selectFromHandler = async (currencyCode: string) => {
    setFrom(currencyCode);
  };

  const selectToHandler = async (currencyCode: string) => {
    setTo(currencyCode);
  };

  const inputFromHandler = async (amount: string | number) => {
    if (currentRate && amount) {
      setAmount(amount);
      setToValue(calculate(amount, currentRate));
      setFromValue(Number(amount));

      push({ query: { ...query, amount: String(amount) } }, undefined, {
        shallow: true,
      });
    }
  };

  const inputToHandler = async (amount: string | number) => {
    if (currentRate && amount) {
      const calculatedValue = calculate(amount, currentRate, true);

      setAmount(calculatedValue);
      setToValue(Number(amount));
      setFromValue(calculatedValue);

      push({ query: { ...query, amount: calculatedValue } }, undefined, {
        shallow: true,
      });
    }
  };

  const resetHandler = () => {
    push('/');
    reset();

    setFromValue(1);

    const rate = getCurrentRate(
      INITIAL_FROM_CURRENCY,
      INITIAL_TO_CURRENCY,
      rates,
    );

    if (rate) {
      setToValue(calculate(1, rate));
    }
  };

  return (
    <Box
      sx={[
        {
          position: 'relative',
          borderRadius: '5px',
          backgroundColor: 'var(--color-background-grey-dark)',
          maxWidth: '45rem',
          minHeight: '10.125rem',
          p: '15px',
          m: '0 auto',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          mb: '1rem',
        }}
      >
        <CurrencySelect
          currencies={currencies}
          initialValue={fromValue}
          initialCurrency={from}
          changeCurrencyHandler={selectFromHandler}
          changeValueHandler={inputFromHandler}
        />
        <IconButton
          color="inherit"
          onClick={handleToggle}
          sx={{
            m: { xs: '0.7rem', sm: '0 1rem' },
          }}
        >
          <SwapHorizIcon />
        </IconButton>
        <CurrencySelect
          currencies={currencies}
          initialCurrency={to}
          initialValue={toValue}
          changeCurrencyHandler={selectToHandler}
          changeValueHandler={inputToHandler}
        />
      </Box>
      <Button
        variant="outlined"
        sx={{
          ml: 'auto',
          mb: { xs: '0.7rem', sm: '0' },
          color: 'white',
          display: 'block',
          fontSize: '.7rem',
          p: '0.2rem 0.8rem',
        }}
        onClick={resetHandler}
      >
        reset
      </Button>
      <RateDescription
        fromCurrencyName={getCurrencyName(from, currencies)}
        toCurrencyName={getCurrencyName(to, currencies)}
        date={rates[from]?.date}
        value={currentRate}
      />
      {isLoading && (
        <CircularProgress
          color="success"
          size={18}
          sx={{ position: 'absolute', right: '0.7rem', bottom: '0.7rem' }}
        />
      )}
    </Box>
  );
});

export default Converter;
