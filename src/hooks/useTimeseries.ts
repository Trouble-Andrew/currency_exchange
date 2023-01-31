import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';

const useTimeseries = (base: string) => {
  const baseCurrency = base.toLowerCase();

  const { data, error, isLoading } = useSWR(
    `https://gist.githubusercontent.com/Trouble-Andrew/a3455838c45b3fd4e6d2c27f4daea020/raw/8b9687206d94d315e2f3609081adbaedcbc14d76/${baseCurrency}.json`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    timeseries: data,
    isLoading,
    isError: error,
  };
};

export default useTimeseries;
