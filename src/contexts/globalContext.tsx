import React, { useState, PropsWithChildren, useReducer } from 'react';
import { Rate, Rates } from 'models/Rates';

interface GlobalContextProps {
  queries: string;
  rates: Rates;
  setQuery: (path: string) => void;
  addRate: (rate: Rate) => void;
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

  return (
    <GlobalContext.Provider
      value={{
        queries: currentQuery,
        rates: state.rates,
        setQuery: setCurrentQuery,
        addRate,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
