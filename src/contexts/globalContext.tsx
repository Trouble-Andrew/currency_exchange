import React, {
  useState,
  PropsWithChildren,
  useReducer,
  useEffect,
} from 'react';
import { Rate, Rates } from 'models/Rates';

interface GlobalContextProps {
  queries: string;
  rates: Rates;
  setQuery: (path: string) => void;
  addRate: (rate: Rate) => void;
  setAmount: (amount: string | number) => void;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  toggle: () => void;
  reset: () => void;
}

type ActionType = { type: 'add_rate'; payload: Rate };

interface State {
  rates: Rates;
}

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
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

const initialContext = {
  queries: '',
  rates: {},
  setQuery: () => {},
  addRate: () => {},
  setAmount: () => {},
  setFrom: () => {},
  setTo: () => {},
  toggle: () => {},
  reset: () => {},
};

export const GlobalContext =
  React.createContext<GlobalContextProps>(initialContext);

export const GlobalContextProvider = (props: PropsWithChildren) => {
  const [currentQuery, setCurrentQuery] = useState(initialContext.queries);
  const [state, dispatch] = useReducer(reducer, {
    rates: {},
  });

  function addRate(rate: Rate) {
    dispatch({
      type: 'add_rate',
      payload: rate,
    });
  }

  function reset() {
    setCurrentQuery('');

    dispatch({
      type: 'set_amount',
      payload: 1,
    });

    dispatch({
      type: 'set_from',
      payload: INITIAL_FROM_CURRENCY,
    });

    dispatch({
      type: 'set_to',
      payload: INITIAL_TO_CURRENCY,
    });
  }

  function setAmount(amount: string | number) {
    dispatch({
      type: 'set_amount',
      payload: amount,
    });
  }

  function setFrom(from: string) {
    if (from === state.to) {
      dispatch({
        type: 'toggle',
      });

      push({ query: { ...query, from: state.to, to: state.from } }, undefined, {
        shallow: true,
      });
    } else {
      dispatch({
        type: 'set_from',
        payload: from,
      });

      push({ query: { ...query, from: from } }, undefined, {
        shallow: true,
      });
    }
  }

  function setTo(to: string) {
    if (to === state.from) {
      dispatch({
        type: 'toggle',
      });

      push({ query: { ...query, from: state.to, to: state.from } }, undefined, {
        shallow: true,
      });
    } else {
      dispatch({
        type: 'set_to',
        payload: to,
      });

      push({ query: { ...query, to: to } }, undefined, {
        shallow: true,
      });
    }
  }

  function toggle() {
    const from = state.from;
    const to = state.to;

    dispatch({
      type: 'toggle',
    });

    push({ query: { ...query, from: to, to: from } }, undefined, {
      shallow: true,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        queries: currentQuery,
        rates: state.rates,
        setQuery: setCurrentQuery,
        addRate,
        reset,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
