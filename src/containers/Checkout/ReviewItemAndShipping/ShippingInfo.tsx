import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setShippingType } from '../../../reducers/checkout/checkoutReducer';

const ShippingInfo = () => {
  const { shippingType } = useAppSelector(state => state.checkout);
  const dispatch = useAppDispatch();

  return (
    <>
      <Box
        sx={theme => ({
          px: 3,
          pt: 2,
          pb: 3,
          mb: 2,
          borderRadius: 1,
          border: '1px solid',
          borderColor:
            shippingType === 'Standard'
              ? theme.palette.text.primary
              : 'transparent',
          backgroundColor: theme.palette.action.hover
        })}
        onClick={() => dispatch(setShippingType('Standard'))}
      >
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              Standard Delivery
            </Typography>
            <Typography variant='body1' sx={{ pt: 0.5 }}>
              Delivery by Wed, Dec 20
            </Typography>
          </Box>
          <Box sx={{ fontSize: '18px' }}>FREE</Box>
        </Stack>
      </Box>
      <Box
        sx={theme => ({
          px: 3,
          pt: 2,
          pb: 3,
          border: '1px solid',
          borderRadius: 1,
          borderColor:
            shippingType === 'Express'
              ? theme.palette.text.primary
              : 'transparent',
          backgroundColor: theme.palette.action.hover
        })}
        onClick={() => dispatch(setShippingType('Express'))}
      >
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              Express Delivery
            </Typography>
            <Typography variant='body1' sx={{ pt: 0.5 }}>
              Delivery by Mon, Dec 15
            </Typography>
          </Box>
          <Box sx={{ fontSize: '18px' }}>$8.00</Box>
        </Stack>
      </Box>
    </>
  );
};

export default ShippingInfo;
