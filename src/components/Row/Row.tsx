import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { Currency } from 'models/Currency';
import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
import { SxProps, Theme } from '@mui/material/styles';
import { calculateChange } from '@/utils/calculateChange';

interface RowProps {
  currency: Currency;
  amount: number;
  previousAmount: number;
  sx?: SxProps<Theme>;
}

const Row = ({ currency, amount, previousAmount, sx = [] }: RowProps) => {
  const changeValue = calculateChange(amount, previousAmount);
  let valueColor;

  if (changeValue === 0) {
    valueColor = 'white';
  } else if (changeValue > 0) {
    valueColor = 'green';
  } else {
    valueColor = 'red';
  }

  return (
    <TableRow
      sx={[
        { '&:last-child td, &:last-child th': { border: 0 } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <TableCell component="th" scope="row">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CurrencyFlag currency={currency} sx={{ mr: {xs: '0', sm: '2rem'}, mt: '0.5rem' }} />
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
      <TableCell align="right" sx={{ fontWeight: '1rem' }}>
        {previousAmount !== 0 && (
          <Typography
            variant="body1"
            component="span"
            sx={{ fw: '1rem' }}
            color={`var(--color-${valueColor})`}
          >
            {`${calculateChange(amount, previousAmount)}%`}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Row;
