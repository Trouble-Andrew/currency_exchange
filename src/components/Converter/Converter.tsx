import useCurrencyStore from '@/store/store';
import { addFlagToCurrency } from '@/utils/addFlagsToCurrency';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { Suspense, useEffect, startTransition, useState } from 'react';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RateDescription from '../RateDescription/RateDescription';
import { getCurrencyName } from '@/utils/getCurrencyName';
import { Rate } from 'models/Rates';
import { getCurrentRate } from '@/utils/getCurrentRate';
import { calculate } from '@/utils/calculate';

const Converter = () => {
  const {
    from,
    to,
    amount,
    rates,
    currencies,
    toggle,
    addRate,
    changeFrom,
    changeTo,
  } = useCurrencyStore((state) => state);

  let currentRate = getCurrentRate(from, to, rates);

  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(
    calculate(amount, currentRate !== null ? currentRate : 1),
  );

  console.log(currentRate);

  useEffect(() => {
    if (currentRate) {
      setToValue(calculate(amount, currentRate));
    }
  }, []);

  useEffect(() => {
    if (currentRate) {
      setToValue(calculate(fromValue, currentRate));
    } else {
      const fetchRate = async () => {
        const usdRate = await import('../../../data/allLatestUSDRes.json');
        const serializeUsdRate = { ...usdRate };
        // console.log(serializeUsdRate.response);
        // return serializeUsdRate.response;
        addRate(serializeUsdRate.response);
      };

      if (!currentRate) {
        fetchRate();
      }
    }
  }, [from, to]);

  const fetchRate = async () => {
    const usdRate = await import('../../../data/allLatestUSDRes.json');
    const serializeUsdRate = { ...usdRate };
    // console.log(serializeUsdRate.response);
    return serializeUsdRate.response;
  };

  const handleToggle = async () => {
    toggle();
    console.log(from);
    console.log(to);
    console.log('TOGGLE RATE', currentRate);

    if (!currentRate) {
      // console.log('change');
      // // addRate(serializeUsdRate.default.response);
      // const newRate = await fetchRate();
      // console.log(newRate);
      // addRate(newRate);
    }
  };

  const selectFromHandler = async (currencyCode: string) => {
    console.log(currencyCode);
    changeFrom(currencyCode);
  };

  const selectToHandler = async (currencyCode: string) => {
    console.log(currencyCode);
    changeTo(currencyCode);
  };

  const inputFromHandler = async (amount: string | number) => {
    // console.log(amount);
    if (currentRate) {
      // console.log(calculate(amount, currentRate));
      setToValue(calculate(amount, currentRate));
    }
  };

  const inputToHandler = async (amount: string | number) => {
    // console.log(amount);
    if (currentRate) {
      setFromValue(calculate(toValue, currentRate));
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            m: '0 1rem',
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
      <RateDescription
        fromCurrencyName={getCurrencyName(from, currencies)}
        toCurrencyName={getCurrencyName(to, currencies)}
        date={rates[from]?.date}
        value={currentRate}
      />
    </Box>
  );
};

export default Converter;
