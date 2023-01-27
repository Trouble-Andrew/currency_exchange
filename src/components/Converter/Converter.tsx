import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState, useReducer } from 'react';
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

type ACTIONTYPE =
  | { type: 'set_amount'; payload: string }
  | { type: 'set_from'; payload: string }
  | { type: 'set_to'; payload: string }
  | { type: 'add_rate'; payload: Rate }
  | { type: 'toggle' };

interface State {
  from: string;
  to: string;
  amount: string | number;
  rates: Rates | [];
}

const initialState: State = {
  from: INITIAL_FROM_CURRENCY,
  to: INITIAL_TO_CURRENCY,
  amount: 1,
  rates: [],
};

function reducer(state: State, action: ACTIONTYPE) {
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
      console.log('toggle');
      return {
        ...state,
        from: state.to,
        to: state.from,
      };
    }
    case 'add_rate': {
      console.log(action.payload);
      return {
        ...state,
        rates: {
          ...state.rates,
          [action.payload.base]: action.payload,
        },
      };
    }
    default:
      Error();
  }
}

const Converter = ({
  currencies,
  rates = initialState.rates,
  amount = initialState.amount,
  from = initialState.from,
  to = initialState.to,
}: InitialProps) => {
  const { push, query } = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    rates,
    amount,
    from,
    to,
  });

  typeof state;

  let currentRate = getCurrentRate(state.from, state.to, state.rates);
  console.log('CURRENT RATE: ', currentRate);

  const [fromValue, setFromValue] = useState(amount);
  const [toValue, setToValue] = useState(
    calculate(amount, currentRate !== null ? currentRate : 1),
  );

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
    console.log(state);
  }, [state.from, state.to]);

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
    // console.log(amount);
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
};

export default Converter;
