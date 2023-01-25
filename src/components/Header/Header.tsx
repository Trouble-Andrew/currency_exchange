import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Link from 'next/link';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <CurrencyExchangeIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Currency Converter
          </Typography>
          <CurrencyExchangeIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            <Link href="/">
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Converter
              </Button>
            </Link>
            <Link href="/rates">
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
