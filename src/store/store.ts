import { create } from 'zustand';
import { Currency } from 'models/Currency';
import { Rate, Rates } from 'models/Rates';

interface CurrencyState {
  from: string;
  to: string;
  amount: number | string;
  currencies: Currency[] | [];
  rates: Rates | {};

  toggle: () => void;
  changeAmount: (amount: number | string) => void;
  addCurrencies: (currencies: Currency[] | []) => void;
  addRate: (rate: Rate) => void;
}

const useCurrencyStore = create<CurrencyState>()((set) => ({
  from: 'RUB',
  to: 'USD',
  amount: 1,
  currencies: [],
  rates: {},
  toggle: () => set((state) => ({ from: state.to, to: state.from })),
  changeAmount: (newAmount) => set(() => ({ amount: newAmount })),
  addCurrencies: (newCurrencies: Currency[]) =>
    set(() => ({ currencies: newCurrencies })),
  addRate: (rate: Rate) => {
    return set((state) => ({
      rates: {
        ...state.rates,
        [rate.base]: rate,
      },
    }));
  },
}));

export default useCurrencyStore;
