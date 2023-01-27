import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Link from 'next/link';
import { INITIAL_FROM_CURRENCY } from '@/pages/constants';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  const baseCurrency = router.query.from
    ? String(router.query.from).toLowerCase()
    : 'rub';

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'var(--color-background-grey-dark)',
        backgroundImage: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <CurrencyExchangeIcon
            sx={{
              mr: 1,
              fontSize: { xs: '2rem', sm: '1.6rem' },
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Currency Converter
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Link href={`/`} passHref>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Converter
              </Button>
            </Link>
            <Link href={`/rates/${baseCurrency}`} passHref>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Rates
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
