import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../../hooks/useRedux';
import { formatPrice } from '../../../utils/string';
import ShippingInfo from './ShippingInfo';

const PaymentMethodPanel = () => {
  const shoppingCart = useAppSelector(state => state.shoppingCart);

  return (
    <>
      <Stack direction='row' sx={{ alignItems: 'center', pt: 3 }}>
        <Typography variant='h5' sx={{ fontWeight: 500, flexGrow: 1 }}>
          3. Review Items and Shipping
        </Typography>
      </Stack>
      {shoppingCart.map(item => (
        <Stack
          key={item.product_id}
          direction='row'
          spacing={3}
          sx={{
            py: 3,
            px: 2,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <img
            draggable={false}
            src={item.image_url}
            alt='alt'
            style={{
              width: '60px',
              height: '80px'
            }}
          />
          <Typography
            variant='body1'
            sx={{
              maxWidth: '250px',
              minWidth: '250px'
            }}
          >
            {item.name}
          </Typography>
          <Typography variant='body1' color='primary'>
            {formatPrice(item.list_price)}
          </Typography>
          <Typography variant='body1'>x{item.quantity}</Typography>
        </Stack>
      ))}

      <Box sx={{ mt: 3 }}>
        <ShippingInfo />
      </Box>
    </>
  );
};

export default PaymentMethodPanel;
