import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Link, Toolbar } from '@mui/material';

import BrandTitleLink from '../../components/Link/BrandTitleLink';
import ThemeIconButton from '../ThemeIconButton/ThemeIconButton';

const CheckoutNavbar = () => {
  return (
    <>
      <AppBar
        elevation={0}
        sx={theme => ({
          borderBottom: `1px solid ${theme.palette.text.primary}`,
          backgroundColor: theme.palette.background.paper
        })}
      >
        <Toolbar>
          <BrandTitleLink sx={{ flexGrow: 1 }} />
          <Link
            component={RouterLink}
            to='/cart'
            color='inherit'
            underline='always'
            sx={theme => ({
              color: theme.palette.text.primary,
              marginLeft: theme.spacing(1),
              marginRight: theme.spacing(1),
              '&:hover': {
                color: theme.palette.primary.main
              }
            })}
          >
            Back to Cart
          </Link>
          <ThemeIconButton />
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' />
    </>
  );
};

export default CheckoutNavbar;
