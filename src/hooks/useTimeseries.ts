import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';

const monthBase = `https://gist.githubusercontent.com/Trouble-Andrew/a3455838c45b3fd4e6d2c27f4daea020/raw/8b9687206d94d315e2f3609081adbaedcbc14d76/`;
const halfYearBase = `https://gist.githubusercontent.com/Trouble-Andrew/569a61f49004067ca905985130f87ebc/raw/3c6a41c6501839b382b1cf4d7b2ed45926a23937/`;
const yearBase = `https://gist.githubusercontent.com/Trouble-Andrew/5d4840d28c42fa331cd131460f522d01/raw/ba021c46cddc1980f766dfdaac4e5dce9842c7c9/`;

const useTimeseries = (base: string, interval: string) => {
  const baseCurrency = base.toLowerCase();
  let url;

  switch (interval) {
    case 'month':
      url = monthBase;
      break;
    case 'half-year':
      url = halfYearBase;
      break;
    case 'year':
      url = yearBase;
      break;
    default:
      url = monthBase;
      break;
  }

  const { data, error, isLoading } = useSWR(
    `${url}${baseCurrency}.json`,
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
