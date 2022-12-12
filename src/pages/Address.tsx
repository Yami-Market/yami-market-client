import { useQuery } from '@tanstack/react-query';
import * as _ from 'lodash';
import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { getShippingAddressesQuery } from '../api/addressApi';
import Loading from '../components/Backdrop/Loading';
import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import { formatPhoneNumber } from '../utils/string';

const Address = () => {
  const addressesQuery = useQuery(getShippingAddressesQuery());

  if (addressesQuery.isLoading) {
    return <Loading />;
  }

  const addressList = addressesQuery.data
    ? _.orderBy(addressesQuery.data, 'created_at', 'desc')
    : [];

  return (
    <>
      <Helmet title='Address' />
      <Box sx={{ px: 5, maxWidth: '1600px' }}>
        <Typography variant='h4' color='primary'>
          Addresses
        </Typography>
      </Box>
      <BlackDivider sx={{ mt: 3 }} />
      <Stack direction='row' flexWrap='wrap' sx={{ p: 3, minHeight: '250px' }}>
        {addressList.map(address => (
          <Box
            key={address.id}
            sx={theme => ({
              width: '350px',
              px: 3,
              pt: 2,
              pb: 3,
              m: 3,
              cursor: 'pointer',
              backgroundColor: theme.palette.action.hover,
              borderRadius: 1
            })}
          >
            <Stack direction='row' sx={{ alignItems: 'center' }}>
              <Typography variant='h6' sx={{ py: 1, flexGrow: 1 }}>
                {`${address.first_name} ${address.last_name}`}
              </Typography>
            </Stack>
            <Typography variant='body1' sx={{ py: 0.2 }}>
              {`${address.street_address} ${address.optional_address}`}
            </Typography>
            <Typography variant='body1' sx={{ py: 0.2 }}>
              {`${address.city}, ${address.state}
              ${address.zip_code} ${address.country}`}
            </Typography>
            <Typography variant='body1'>
              {formatPhoneNumber(address.phone_number)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default Address;
