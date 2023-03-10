import { CURRENCY_CODES } from '@/lib/constants';

export const getCurrencySymbols = (base: string) => {
  return CURRENCY_CODES.filter((code) => code !== base.toUpperCase()).join(',');
};
