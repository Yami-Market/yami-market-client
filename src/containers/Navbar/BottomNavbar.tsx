import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import {
  AccountIcon,
  HomeIcon,
  MenuIcon,
  ShoppingCartIcon
} from '../../icons/UIIcon';

const BottomNavbar = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', md: 'none' },
        zIndex: theme => theme.zIndex.drawer + 1
      }}
      elevation={0}
    >
      <Divider />
      <BottomNavigation showLabels>
        <BottomNavigationAction
          component={RouterNavLink}
          to='/'
          // @ts-ignore
          style={({ isActive }) => ({
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          })}
          label='Home'
          icon={<HomeIcon size='xl' />}
        />
        <BottomNavigationAction
          component={RouterNavLink}
          to='/category'
          // @ts-ignore
          style={({ isActive }) => ({
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          })}
          label='Category'
          icon={<MenuIcon size='xl' />}
        />
        <BottomNavigationAction
          component={RouterNavLink}
          to='/cart'
          // @ts-ignore
          style={({ isActive }) => ({
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          })}
          label='ShoppingCart'
          icon={<ShoppingCartIcon size='xl' />}
        />
        <BottomNavigationAction
          component={RouterNavLink}
          to='/login'
          // @ts-ignore
          style={({ isActive }) => ({
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          })}
          label='Me'
          icon={<AccountIcon size='xl' />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
