import { CircularProgress, IconButton } from '@mui/material';
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

type ActionType =
  | { type: 'set_amount'; payload: string | number }
  | { type: 'set_from'; payload: string }
  | { type: 'set_to'; payload: string }
  | { type: 'toggle' };

interface State {
  from: string;
  to: string;
  amount: string | number;
}

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'set_amount': {
      return {
        ...state,
        amount: action.payload,
      };
    }
    case 'set_from': {
      return {
        ...state,
        from: action.payload,
      };
    }
    case 'set_to': {
      return {
        ...state,
        to: action.payload,
      };
    }
    case 'toggle': {
      return {
        ...state,
        from: state.to,
        to: state.from,
      };
    }
  }
}

const Converter = memo(function Converter({ amount, from, to }: InitialProps) {
  const { push, query, asPath } = useRouter();

  const currencies = CURRENCIES;
  const queryFrom = query.from as string;
  const queryAmount = query.from as string | number;
  const queryTo = query.to as string;

  const { rate, isLoading, isError } = useRate(queryFrom || from);
  const { setQuery, addRate, rates } = useGlobalContext();

  const [state, dispatch] = useReducer(reducer, {
    amount: queryAmount || amount,
    from: queryFrom || from,
    to: queryTo || to,
  });

  let currentRate = getCurrentRate(state.from, state.to, rates);
  // console.log('CURRENT RATE: ', currentRate);
  // console.log('CURRENT RATE: ', rates);

  const [fromValue, setFromValue] = useState(state.amount);
  const [toValue, setToValue] = useState(
    calculate(state.amount, currentRate !== null ? currentRate : 1),
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
  }, [state.from, state.to, isLoading, isError, currentRate]);

  // useEffect(() => {
  //   setQuery(asPath);
  // });

  const handleToggle = async () => {
    dispatch({ type: 'toggle' });

    push({ query: { ...query, from: state.to, to: state.from } }, undefined, {
      shallow: true,
    });
  };

  const selectFromHandler = async (currencyCode: string) => {
    dispatch({ type: 'set_from', payload: currencyCode });

    push({ query: { ...query, from: currencyCode } }, undefined, {
      shallow: true,
    });
  };

  const selectToHandler = async (currencyCode: string) => {
    dispatch({ type: 'set_to', payload: currencyCode });

    push({ query: { ...query, to: currencyCode } }, undefined, {
      shallow: true,
    });
  };

  const inputFromHandler = async (amount: string | number) => {
    if (currentRate && amount) {
      const calculatedValue = calculate(amount, currentRate);

      dispatch({ type: 'set_amount', payload: calculatedValue });
      setToValue(calculate(amount, currentRate));
      setFromValue(Number(amount));

      push({ query: { ...query, amount: String(amount) } }, undefined, {
        shallow: true,
      });
    }
  };

  const inputToHandler = async (amount: string | number) => {
    if (currentRate && amount) {
      const calculatedValue = calculate(amount, currentRate);

      dispatch({ type: 'set_amount', payload: calculatedValue });
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
          mb: '2rem',
        }}
      >
        <CurrencySelect
          currencies={currencies}
          initialValue={fromValue}
          initialCurrency={state.from}
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
          initialCurrency={state.to}
          initialValue={toValue}
          changeCurrencyHandler={selectToHandler}
          changeValueHandler={inputToHandler}
        />
      </Box>
      <RateDescription
        fromCurrencyName={getCurrencyName(state.from, currencies)}
        toCurrencyName={getCurrencyName(state.to, currencies)}
        date={rates[state.from]?.date}
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
