import React, { useState, PropsWithChildren } from 'react';

interface GlobalContextProps {
  queries: string;
  setQuery: (path: string) => void;
}

const initialContext = {
  queries: '',
  setQuery: () => {},
};

export const GlobalContext =
  React.createContext<GlobalContextProps>(initialContext);

export const GlobalContextProvider = (props: PropsWithChildren) => {
  const [currentQuery, setCurrentQuery] = useState(initialContext.queries);

  return (
    <GlobalContext.Provider
      value={{
        queries: currentQuery,
        setQuery: setCurrentQuery,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
