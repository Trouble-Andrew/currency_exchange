import { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Rate, Rates } from 'models/Rates';
import { CurrencyList } from 'models/Currency';
import { CURRENCY_CODES } from '@/pages/constants';
import Row from '../Row/Row';

interface RatesTableProps {
  rates: Rates;
  base: string;
  currencies: CurrencyList;
  historical: Rate;
}

const RatesTable = memo(function RatesTable({
  base,
  rates,
  currencies,
  historical,
}: RatesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: 'var(--color-background-dark)' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: '700' }}></TableCell>
            <TableCell align="right" sx={{ fontWeight: '700' }}>
              Amount
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: '700' }}>
              Change (24h)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row
            currency={currencies[base]}
            amount={1}
            sx={{ backgroundColor: 'var(--color-background-grey)' }}
            previousAmount={0}
          />
          {CURRENCY_CODES.map((code) => {
            if (code === base) {
              return;
            }
            return (
              currencies[code] && (
                <Row
                  key={code}
                  currency={currencies[code]}
                  amount={rates[base]?.rates[code]}
                  previousAmount={historical.rates[code]}
                />
              )
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default RatesTable;
