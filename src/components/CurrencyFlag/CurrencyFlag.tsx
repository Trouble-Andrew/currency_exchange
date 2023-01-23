import { Box, Typography } from '@mui/material';
import { Currency } from 'models/Currency';
import Image from 'next/image';
import styles from './CurrencyFlag.module.scss';

interface CurrencyFlagProps {
  currency: Currency;
}

const CurrencyFlag = ({ currency }: CurrencyFlagProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '35px',
      }}
    >
      <Image
        width={20}
        height={18}
        src={`https://flagcdn.com/${currency.flag}.svg`}
        alt={`${currency.currency_name}`}
        className={styles.flagImg}
      />
      <Typography variant="body2" component="span" sx={{ mt: '0.2rem' }}>
        {currency.currency_code}
      </Typography>
    </Box>
  );
};

export default CurrencyFlag;
