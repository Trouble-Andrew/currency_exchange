import { Box, Typography } from '@mui/material';
import { Currency } from 'models/Currency';
import Image from 'next/image';
import styles from './CurrencyFlag.module.scss';
import { SxProps, Theme } from '@mui/material/styles';

interface CurrencyFlagProps {
  currency: Currency;
  sx?: SxProps<Theme>;
}

const CurrencyFlag = ({ sx = [], currency }: CurrencyFlagProps) => {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '35px',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          position: 'relative',
          width: '1.5625rem',
          height: '1.125rem',
        }}
      >
        <Image
          // width={20}
          // height={18}
          fill={true}
          src={`https://flagcdn.com/${currency.flag}.svg`}
          alt={`${currency.currency_name}`}
          className={styles.flagImg}
        />
      </Box>
      <Typography variant="body2" component="span" sx={{ mt: '0.2rem' }}>
        {currency.currency_code}
      </Typography>
    </Box>
  );
};

export default CurrencyFlag;
