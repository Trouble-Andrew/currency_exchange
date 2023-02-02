import React, {
  useState,
  PropsWithChildren,
  useReducer,
  useEffect,
} from 'react';
import { Rate, Rates } from 'models/Rates';
import { useRouter } from 'next/router';
import { INITIAL_FROM_CURRENCY, INITIAL_TO_CURRENCY } from '@/lib/constants';

interface GlobalContextProps extends State {
  queries: string;
  setQuery: (path: string) => void;
  addRate: (rate: Rate) => void;
  setAmount: (amount: string | number) => void;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  toggle: () => void;
  reset: () => void;
}

type ActionType =
  | { type: 'add_rate'; payload: Rate }
  | { type: 'set_amount'; payload: string | number }
  | { type: 'set_from'; payload: string }
  | { type: 'set_to'; payload: string }
  | { type: 'toggle' };

interface State {
  amount: string | number;
  from: string;
  to: string;
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

const initialContext = {
  amount: '1',
  from: INITIAL_FROM_CURRENCY,
  to: INITIAL_TO_CURRENCY,
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

  const { push, query } = useRouter();

  const queryFrom = query.from as string;
  const queryAmount = query.amount as string | number;
  const queryTo = query.to as string;

  const [state, dispatch] = useReducer(reducer, {
    amount: queryAmount || '1',
    from: queryFrom || INITIAL_FROM_CURRENCY,
    to: queryTo || INITIAL_TO_CURRENCY,
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
        amount: state.amount,
        from: state.from,
        to: state.to,
        queries: currentQuery,
        rates: state.rates,
        setQuery: setCurrentQuery,
        setAmount,
        setFrom,
        setTo,
        toggle,
        addRate,
        reset,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
