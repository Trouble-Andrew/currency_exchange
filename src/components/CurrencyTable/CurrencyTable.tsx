import { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Rates } from 'models/Rates';
import { CurrencyList } from 'models/Currency';
import { CURRENCY_CODES } from '@/pages/constants';
import Row from '../Row/Row';

interface CurrencyTableProps {
  rates: Rates;
  base: string;
  currencies: CurrencyList;
}

const CurrencyTable = memo(function CurrencyTable({
  base,
  rates,
  currencies,
}: CurrencyTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: 'var(--color-background-grey)' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: '700' }}></TableCell>
            <TableCell align="right" sx={{ fontWeight: '700' }}>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row
            currency={currencies[base]}
            amount={1}
            sx={{ backgroundColor: 'var(--color-background-grey)' }}
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
                />
              )
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default CurrencyTable;
