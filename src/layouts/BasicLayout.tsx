import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Box, Fab } from '@mui/material';

import Footer from '../components/Footer/Footer';
import Helmet from '../components/Helmet/Helmet';
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';
import BottomNavbar from '../containers/Navbar/BottomNavbar';
import { AngleUpIcon } from '../icons/UIIcon';
import { AuthProvider } from '../providers/AuthProvider';
import { ShoppingCartProvider } from '../providers/ShoppingCartProvider';

export type LayoutProps = {
  Navbar: React.ReactElement;
};

const BasicLayout = ({ Navbar }: LayoutProps) => {
  return (
    <>
      <Helmet />
      <AuthProvider>
        <ShoppingCartProvider>
          {Navbar}
          <Box
            component='main'
            sx={{
              pb: { xs: 8, md: 0 }
            }}
          >
            <Outlet />
          </Box>
          <Footer />
          <BottomNavbar />
          <ScrollToTopButton>
            <Fab size='small'>
              <AngleUpIcon fontSize={24} />
            </Fab>
          </ScrollToTopButton>
          <ScrollRestoration />
        </ShoppingCartProvider>
      </AuthProvider>
    </>
  );
};

export default BasicLayout;
