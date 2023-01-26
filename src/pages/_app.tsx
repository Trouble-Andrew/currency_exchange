import MainLayout from '@/components/MainLayout/MainLayout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GetServerSidePropsContext } from 'next';
import { INITIAL_FROM_CURRENCY } from './constants';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#fff',
    },
    // primary: {
    //   main: '#023047',
    // },
    // secondary: {
    //   main: '#ffb703',
    // },
  },
  typography: {
    fontFamily: 'inherit',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Head>
        <title>Currency Exchange</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout className={poppins.className}>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}

