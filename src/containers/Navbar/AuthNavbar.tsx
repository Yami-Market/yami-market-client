import { AppBar, Toolbar } from '@mui/material';

import BrandTitleLink from '../../components/Link/BrandTitleLink';
import ThemeIconButton from '../ThemeIconButton/ThemeIconButton';

const AuthNavbar = () => {
  return (
    <>
      <AppBar
        elevation={0}
        sx={theme => ({
          borderBottom: `1px solid ${theme.palette.text.primary}`,
          backgroundColor: theme.palette.background.paper
        })}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <BrandTitleLink />

          <ThemeIconButton sx={{ position: 'absolute', right: '24px' }} />
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' />
    </>
  );
};

export default AuthNavbar;
