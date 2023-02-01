import { Button, CircularProgress, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState, useReducer, memo } from 'react';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RateDescription from '../RateDescription/RateDescription';
import { getCurrencyName } from '@/utils/getCurrencyName';
import { Rate, Rates } from 'models/Rates';
import { getCurrentRate } from '@/utils/getCurrentRate';
import { calculate } from '@/utils/calculate';
import { InitialProps } from '@/pages';
import { useRouter } from 'next/router';
import {
  INITIAL_FROM_CURRENCY,
  INITIAL_TO_CURRENCY,
  CURRENCIES,
} from '@/lib/constants';
import { useGlobalContext } from '@/contexts';
import useRate from '@/hooks/useRate';

const Converter = memo(function Converter() {
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
  } = useGlobalContext();

  const { rate, isLoading, isError } = useRate(from);

  let currentRate = getCurrentRate(from, to, rates);
  // console.log('CURRENT RATE: ', currentRate);
  // console.log('CURRENT RATE: ', rates);

  const [fromValue, setFromValue] = useState(amount);
  const [toValue, setToValue] = useState(
    calculate(amount, currentRate !== null ? currentRate : 1),
  );

  // console.log('STATE: ', state);
  // console.log('QUERY: ', query);
  // console.log('FETCHER RATE', rate);

  // console.log(rate.response);

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

    setQuery(asPath);
  }, [from, to, isLoading, isError, currentRate]);

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
      const calculatedValue = calculate(amount, currentRate);

      setAmount(calculatedValue);
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

      push(
        { query: { ...query, amount: calculate(amount, currentRate) } },
        undefined,
        {
          shallow: true,
        },
      );
    }
  };

  const resetHandler = () => {
    push('/');

    setAmount(1);
    setFrom(INITIAL_FROM_CURRENCY);
    setTo(INITIAL_TO_CURRENCY);

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
      sx={{
        position: 'relative',
        borderRadius: '5px',
        backgroundColor: 'var(--color-background-grey-dark)',
        maxWidth: '45rem',
        minHeight: '10.125rem',
        p: '15px',
        m: '0 auto',
      }}
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
