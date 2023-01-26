export interface Currency {
  currency_name: string;
  currency_code: string;
  decimal_units: string;
  flag?: string;
  countries: string[];
}

export interface CurrencyList {
  [key: string]: Currency;
}

export interface CurrencyProps {
  currencies: CurrencyList;
}
