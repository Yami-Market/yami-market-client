import { Link as RouterLink, useLocation } from 'react-router-dom';

import { AppBar, Badge, Box, IconButton, Toolbar } from '@mui/material';

import BrandTitleLink from '../../components/Link/BrandTitleLink';
import LoginLink from '../../components/Link/LoginLink';
import SignupLink from '../../components/Link/SignupLink';
import UserLink from '../../components/Link/UserLink';
import { useAppSelector } from '../../hooks/useRedux';
import { ShoppingCartIcon } from '../../icons/UIIcon';
import { NavbarProvider } from '../../providers/NavbarProvider';
import CategoryPopover from '../Category/CategoryPopover';
import SearchBar from '../SearchBar/SearchBar';
import ThemeIconButton from '../ThemeIconButton/ThemeIconButton';

const MainNavbar = () => {
  const location = useLocation();
  const { user, shoppingCart } = useAppSelector(state => ({
    user: state.user,
    shoppingCart: state.shoppingCart
  }));
  const totalQuantity = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // const profileQuery = useQuery(getProfileQuery(user));
  //
  // const userProfile = profileQuery.data ? profileQuery.data : null;

  return (
    <>
      <NavbarProvider>
        <AppBar
          elevation={0}
          sx={theme => ({
            borderBottom: `1px solid ${theme.palette.text.primary}`,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: theme.palette.background.paper
          })}
        >
          <Toolbar>
            <BrandTitleLink />

            <CategoryPopover />

            <SearchBar />

            <Box
              sx={{
                color: theme => theme.palette.text.primary,
                display: { xs: 'none', md: 'block' }
              }}
            >
              {user.id ? (
                <UserLink firstName={user.first_name} />
              ) : (
                <>
                  <LoginLink state={{ callbackUrl: location.pathname }} />
                  /
                  <SignupLink state={{ callbackUrl: location.pathname }} />
                </>
              )}
            </Box>

            <ThemeIconButton />

            <IconButton
              component={RouterLink}
              to='/cart'
              color='primary'
              sx={{
                width: '40px',
                height: '40px',
                display: { xs: 'none', md: 'flex' }
                // color: theme => theme.palette.text.primary
              }}
            >
              <Badge badgeContent={totalQuantity} color='primary'>
                <ShoppingCartIcon size='sm' />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar id='back-to-top-anchor' />
      </NavbarProvider>
    </>
  );
};

export default MainNavbar;
