import { Box, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        backgroundColor: 'var(--color-background-grey-dark)',
        backgroundImage: 'none',
        minHeight: '4rem',
      }}
    >
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            href="https://github.com/Trouble-Andrew/"
            target="_blank"
            rel="noopener"
            sx={{
              display: 'grid',
              placeContent: 'center',
            }}
          >
            <GitHubIcon sx={{ color: 'var(--color-white)' }} />
          </Link>
        </li>
        <li>
          <Typography
            variant="body2"
            component="span"
            sx={{ fontSize: '0.8rem' }}
          >
            2023
          </Typography>
        </li>
      </ul>
    </Box>
  );
};

export default Footer;
