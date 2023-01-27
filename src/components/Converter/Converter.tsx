import { IconButton } from '@mui/material';
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
import { INITIAL_FROM_CURRENCY, INITIAL_TO_CURRENCY } from '@/pages/constants';
import { useGlobalContext } from '@/contexts';

type ActionType =
  | { type: 'set_amount'; payload: string | number }
  | { type: 'set_from'; payload: string }
  | { type: 'set_to'; payload: string }
  | { type: 'add_rate'; payload: Rate }
  | { type: 'toggle' };

interface State {
  from: string;
  to: string;
  amount: string | number;
  rates: Rates;
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
    case 'add_rate': {
      return {
        ...state,
        rates: {
          ...state.rates,
          [action.payload.base]: action.payload,
        },
      };
    }
  }
}

const Converter = memo(function Converter({
  currencies,
  rates,
  amount,
  from,
  to,
}: InitialProps) {
  const { push, query, asPath } = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    amount: amount,
    from: from,
    to: to,
    rates: rates,
  });

  let currentRate = getCurrentRate(state.from, state.to, state.rates);
  // console.log('CURRENT RATE: ', currentRate);
  console.log('CURRENT RATE: ', rates);

  const [fromValue, setFromValue] = useState(amount);
  const [toValue, setToValue] = useState(
    calculate(amount, currentRate !== null ? currentRate : 1),
  );

  const { setQuery } = useGlobalContext();

  useEffect(() => {
    if (currentRate) {
      setToValue(calculate(amount, currentRate));
    }
  }, [currentRate]);

  useEffect(() => {
    if (currentRate) {
      setToValue(calculate(fromValue, currentRate));
    } else {
      const fetchRate = async () => {
        const usdRate = await import('../../../data/allLatestUSDRes.json');
        const serializeUsdRate = { ...usdRate };
        // console.log(serializeUsdRate.response);
        // return serializeUsdRate.response;
        dispatch({
          type: 'add_rate',
          payload: serializeUsdRate.response,
        });
      };

      if (!currentRate) {
        fetchRate();
      }
    }
  }, [state.from, state.to]);

  useEffect(() => {
    setQuery(asPath);
  });

  const fetchRate = async () => {
    const usdRate = await import('../../../data/allLatestUSDRes.json');
    const serializeUsdRate = { ...usdRate };
    // console.log(serializeUsdRate.response);
    return serializeUsdRate.response;
  };

  const handleToggle = async () => {
    dispatch({ type: 'toggle' });

    push({ query: { ...query, from: state.to, to: state.from } }, undefined, {
      shallow: true,
    });

    if (!currentRate) {
      // console.log('change');
      // // addRate(serializeUsdRate.default.response);
      // const newRate = await fetchRate();
      // console.log(newRate);
      // addRate(newRate);
    }
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
    if (currentRate) {
      // console.log(calculate(amount, currentRate));
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
    if (currentRate) {
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
        borderRadius: '5px',
        backgroundColor: 'var(--color-background-grey-dark)',
        maxWidth: '45rem',
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
        date={rates[from]?.date}
        value={currentRate}
      />
    </Box>
  );
});

export default Converter;
