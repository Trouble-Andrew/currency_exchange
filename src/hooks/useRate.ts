import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { getCurrencySymbols } from '@/utils/getCurrencySymbols';
import { MAIN_KEY, MAIN_URl } from '@/pages/constants';

const useRate = (base: string) => {
  const baseCurrency = base.toLowerCase();
  const otherCurrencies = getCurrencySymbols(base);

  const { data, error, isLoading } = useSWR(
    `https://gist.githubusercontent.com/Trouble-Andrew/f796c665bec4e6ca919285267d06ce84/raw/ed902c9a133f4ca946644da3c8319d89f1764903/${baseCurrency}.json`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    rate: data,
    isLoading,
    isError: error,
  };
};

export default useRate;
