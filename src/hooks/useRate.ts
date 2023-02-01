import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { getCurrencySymbols } from '@/utils/getCurrencySymbols';

const useRate = (base: string) => {
  const baseCurrency = base.toLowerCase();
  const otherCurrencies = getCurrencySymbols(base);

  const { data, error, isLoading } = useSWR(
    `${process.env.MAIN_URl}/latest?api_key=${process.env.MAIN_KEY}&base=${baseCurrency}&symbols=${otherCurrencies}`,
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
