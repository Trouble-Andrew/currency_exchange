import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { Currency } from 'models/Currency';
import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
import { SxProps, Theme } from '@mui/material/styles';

interface RowProps {
  currency: Currency;
  amount: number;
  sx?: SxProps<Theme>;
}

const Row = ({ currency, amount, sx = [] }: RowProps) => {
  return (
    <TableRow
      sx={[
        { '&:last-child td, &:last-child th': { border: 0 } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <TableCell component="th" scope="row">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CurrencyFlag currency={currency} sx={{ mr: '2rem', mt: '0.5rem' }} />
          <Typography
            variant="body1"
            component="span"
            sx={{ display: { xs: 'none', sm: 'inline-block' } }}
          >
            {currency.currency_name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right" sx={{ fontWeight: '1rem' }}>
        <Typography variant="body1" component="span" sx={{ fw: '1rem' }}>
          {amount}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default Row;
