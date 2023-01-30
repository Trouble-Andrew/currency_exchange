export const RAPID_URl = 'https://currencyscoop.p.rapidapi.com';
export const MAIN_URl = 'https://api.currencybeacon.com/v1';

export const RAPID_KEY = '200efc1e60msha7e42b2f9b16a84p1496f4jsnf31ff489da1f';
export const MAIN_KEY = '678605141e3237b7e9c7a02a2edb15e3';

// latest example
// 'https://api.currencybeacon.com/v1/latest?api_key=678605141e3237b7e9c7a02a2edb15e3&base=USD&symbols=RUB,EUR,GBP,JPY,TRY,KZT,UAH,BYN,KGS,CNY,GEL,CHF,PLN'

// timeseries example
// 'https://api.currencybeacon.com/v1/timeseries?api_key=678605141e3237b7e9c7a02a2edb15e3&base=RUB&symbols=USD,EUR,GBP,JPY,TRY,KZT,UAH,BYN,KGS,CNY,GEL,CHF,PLN&start_date=2022-01-26&end_date=2023-01-26'

// historical example
// 'https://api.currencybeacon.com/v1/historical?api_key=678605141e3237b7e9c7a02a2edb15e3&base=RUB&symbols=USD,EUR,GBP,JPY,TRY,KZT,UAH,BYN,KGS,CNY,GEL,CHF,PLN&date=2023-01-26'

// gist
// https://gist.githubusercontent.com/Trouble-Andrew/f796c665bec4e6ca919285267d06ce84/raw/7c8e6d401423e1dcb6bc02e1637621af8d7c3ce6/byn.json

export const INITIAL_FROM_CURRENCY = 'RUB';
export const INITIAL_TO_CURRENCY = 'USD';

export const CURRENCY_CODES = [
  'USD',
  'RUB',
  'EUR',
  'GBP',
  'JPY',
  'TRY',
  'KZT',
  'UAH',
  'BYN',
  'KGS',
  'CNY',
  'GEL',
  'CHF',
  'PLN',
];

export const CURRENCIES = {
  BYN: {
    currency_name: 'Belarusian ruble',
    currency_code: 'BYN',
    decimal_units: '2',
    countries: ['Belarus'],
    flag: 'by',
  },
  CHF: {
    currency_name: 'Swiss franc',
    currency_code: 'CHF',
    decimal_units: '2',
    countries: ['Switzerland', 'Liechtenstein (LI)'],
    flag: 'ch',
  },
  CNY: {
    currency_name: 'Renminbi (Chinese) yuan',
    currency_code: 'CNY',
    decimal_units: '2',
    countries: ['China'],
    flag: 'cn',
  },
  EUR: {
    currency_name: 'Euro',
    currency_code: 'EUR',
    decimal_units: '2',
    countries: [
      'Åland Islands (AX)',
      'European Union (EU)',
      'Andorra (AD)',
      'Austria (AT)',
      'Belgium (BE)',
      'Cyprus (CY)',
      'Estonia (EE)',
      'Finland (FI)',
      'France (FR)',
      'French Southern and Antarctic Lands (TF)',
      'Germany (DE)',
      'Greece (GR)',
      'Guadeloupe (GP)',
      'Ireland (IE)',
      'Italy (IT)',
      'Kosovo (XK)',
      'Latvia (LV)',
      'Lithuania (LT)',
      'Luxembourg (LU)',
      'Malta (MT)',
      'French Guiana (GF)',
      'Martinique (MQ)',
      'Mayotte (YT)',
      'Monaco (MC)',
      'Montenegro (ME)',
      'Netherlands (NL)',
      'Portugal (PT)',
      'Réunion (RE)',
      'Saint Barthélemy (BL)',
      'Saint Martin (MF)',
      'Saint Pierre and Miquelon (PM)',
      'San Marino (SM)',
      'Slovakia (SK)',
      'Slovenia (SI)',
      'Spain (ES)',
      'Holy See (VA)',
    ],
    flag: 'eu',
  },
  GBP: {
    currency_name: 'Pound sterling',
    currency_code: 'GBP',
    decimal_units: '2',
    countries: [
      'United Kingdom',
      'British Indian Ocean Territory (IO) (also uses USD)',
      'the  Isle of Man (IM',
      'see Manx pound)',
      'Jersey (JE',
      'see Jersey pound)',
      'and  Guernsey (GG',
      'see Guernsey pound)',
    ],
    flag: 'gb',
  },
  GEL: {
    currency_name: 'Georgian lari',
    currency_code: 'GEL',
    decimal_units: '2',
    countries: ['Georgia'],
    flag: 'ge',
  },
  JPY: {
    currency_name: 'Japanese yen',
    currency_code: 'JPY',
    decimal_units: '0',
    countries: ['Japan'],
    flag: 'jp',
  },
  KGS: {
    currency_name: 'Kyrgyzstani som',
    currency_code: 'KGS',
    decimal_units: '2',
    countries: ['Kyrgyzstan'],
    flag: 'kg',
  },
  KZT: {
    currency_name: 'Kazakhstani tenge',
    currency_code: 'KZT',
    decimal_units: '2',
    countries: ['Kazakhstan'],
    flag: 'kz',
  },
  PLN: {
    currency_name: 'Polish złoty',
    currency_code: 'PLN',
    decimal_units: '2',
    countries: ['Poland'],
    flag: 'pl',
  },
  RUB: {
    currency_name: 'Russian ruble',
    currency_code: 'RUB',
    decimal_units: '2',
    countries: ['Russia'],
    flag: 'ru',
  },
  TRY: {
    currency_name: 'Turkish lira',
    currency_code: 'TRY',
    decimal_units: '2',
    countries: ['Turkey', 'Northern Cyprus'],
    flag: 'tr',
  },
  UAH: {
    currency_name: 'Ukrainian hryvnia',
    currency_code: 'UAH',
    decimal_units: '2',
    countries: ['Ukraine'],
    flag: 'ua',
  },
  USD: {
    currency_name: 'United States dollar',
    currency_code: 'USD',
    decimal_units: '2',
    countries: [
      'United States',
      'American Samoa (AS)',
      'Barbados (BB) (as well as Barbados Dollar)',
      'Bermuda (BM) (as well as Bermudian Dollar)',
      'British Indian Ocean Territory (IO) (also uses GBP)',
      'British Virgin Islands (VG)',
      'Caribbean Netherlands (BQ – Bonaire',
      'Sint Eustatius and Saba)',
      'Ecuador (EC)',
      'El Salvador (SV)',
      'Guam (GU)',
      'Haiti (HT)',
      'Marshall Islands (MH)',
      'Federated States of Micronesia (FM)',
      'Northern Mariana Islands (MP)',
      'Palau (PW)',
      'Panama (PA) (as well as Panamanian Balboa)',
      'Puerto Rico (PR)',
      'Timor-Leste (TL)',
      'Turks and Caicos Islands (TC)',
      'U.S. Virgin Islands (VI)',
      'United States Minor Outlying Islands (UM)  Cambodia also uses the USD officially.',
    ],
    flag: 'us',
  },
};
