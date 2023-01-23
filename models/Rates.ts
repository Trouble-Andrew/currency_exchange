export interface Rate {
  date: string;
  base: string;
  rates: {
    [key: string]: number;
  };
}

export interface Rates {
  [key: string]: Rate;
}
