import React from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';

import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import UserGender from '../containers/Account/UserGender';
import UserName from '../containers/Account/UserName';
import UserPassword from '../containers/Account/UserPassword';
import useAuth from '../hooks/useAuth';

const Account = () => {
  const { user } = useAuth();
  return (
    <>
      <Helmet title='Account' />
      <Box sx={{ px: 5, maxWidth: '1600px' }}>
        <Typography variant='h4' color='primary'>
          Account Information
        </Typography>
      </Box>
      <BlackDivider sx={{ mt: 3 }} />
      <Stack direction='row' sx={{ minHeight: '250px', maxWidth: '1600px' }}>
        <Stack spacing={2} sx={{ flexGrow: 1, px: 5, mt: 3 }}>
          <Typography variant='h5' sx={{ mb: 1 }}>
            Profile
          </Typography>
          <UserName />
          <UserGender />
        </Stack>
        <Divider orientation='vertical' flexItem />
        <Stack spacing={2} sx={{ flexGrow: 1, px: 5, mt: 3 }}>
          <Typography variant='h5' sx={{ mb: 1 }}>
            Login & Security
          </Typography>
          <Box>
            <Typography variant='body1' color='text.secondary'>
              Email
            </Typography>
            <Stack direction='row' sx={{ alignItems: 'center' }}>
              <Typography sx={{ fontSize: '18px', flexGrow: 1 }}>
                {user.email}
              </Typography>
              <Typography
                variant='body2'
                color='text.disabled'
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                Change
              </Typography>
            </Stack>
          </Box>
          <UserPassword />
        </Stack>
      </Stack>
    </>
  );
};

export default Account;
