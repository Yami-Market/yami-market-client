import { Navigate, Link as RouterLink, useLocation } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import { Address } from '../api/addressApi';
import { NewOrderResponse } from '../api/orderApi';
import Helmet from '../components/Helmet/Helmet';
import useAuth from '../hooks/useAuth';
import { formatPhoneNumber } from '../utils/string';

const Confirmation = () => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(location);

  if (!user.id && location.state?.shippingAddress && location.state?.order) {
    return <Navigate to='/login' replace />;
  }

  const shippingAddress: Address = location.state?.shippingAddress;
  const order: NewOrderResponse = location.state?.order;

  return (
    <>
      <Helmet title='Confirmation' />
      <Stack sx={{ alignItems: 'center', py: 20 }}>
        <Typography variant='h3'>Thank you for your order</Typography>

        <Typography variant='h5' sx={{ mt: 5, mb: 3 }}>
          Deliver to
        </Typography>

        <Box
          sx={theme => ({
            px: 3,
            pt: 2,
            pb: 3,
            mb: 2,
            width: '350px',
            cursor: 'pointer',
            backgroundColor: theme.palette.action.hover,
            borderRadius: 1
          })}
        >
          <Typography variant='h6' sx={{ py: 1, flexGrow: 1 }}>
            {`${shippingAddress.first_name} ${shippingAddress.last_name}`}
          </Typography>
          <Typography variant='body1' sx={{ py: 0.2 }}>
            {`${shippingAddress.street_address} ${shippingAddress.optional_address}`}
          </Typography>
          <Typography variant='body1' sx={{ py: 0.2 }}>
            {`${shippingAddress.city}, ${shippingAddress.state}
              ${shippingAddress.zip_code} ${shippingAddress.country}`}
          </Typography>
          <Typography variant='body1'>
            {formatPhoneNumber(shippingAddress.phone_number)}
          </Typography>
        </Box>

        <Typography
          component={RouterLink}
          to={`/order/${order.id}`}
          variant='body1'
          sx={{
            color: 'text.primary',
            cursor: 'pointer',
            textDecoration: 'underline',
            mt: 3
          }}
        >
          Review Your Order
        </Typography>

        <Typography
          component={RouterLink}
          to='/'
          variant='h5'
          color='primary'
          sx={{
            cursor: 'pointer',
            textAlign: 'center',
            mt: 3
          }}
        >
          Keep Shopping
        </Typography>
      </Stack>
    </>
  );
};

export default Confirmation;
