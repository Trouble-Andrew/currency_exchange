import { Currency } from 'models/Currency';
import { create } from 'zustand';
// import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface CurrencyState {
  from: string;
  to: string;
  amount: number | string;
  currencies: Currency[] | [];
  toggle: () => void;
  changeAmount: (amount: number | string) => void;
  addCurrencies: (currencies: Currency[] | []) => void;
}

const useCurrencyStore = create<CurrencyState>()((set) => ({
  from: 'USD',
  to: 'EUR',
  amount: 1,
  currencies: [],
  toggle: () => set((state) => ({ from: state.to, to: state.from })),
  changeAmount: (newAmount) => set(() => ({ amount: newAmount })),
  addCurrencies: (newCurrencies: Currency[]) =>
    set(() => ({ currencies: newCurrencies })),
}));

export default useCurrencyStore;
