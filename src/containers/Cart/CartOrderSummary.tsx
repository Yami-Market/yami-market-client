import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import BlackDivider from '../../components/Divider/BlackDivider';
import { useAppSelector } from '../../hooks/useRedux';
import { formatPrice } from '../../utils/string';

const CartOrderSummary = () => {
  const shoppingCart = useAppSelector(state => state.shoppingCart);

  const totalPrice = shoppingCart.reduce(
    (total, item) => total + item.list_price * item.quantity,
    0
  );

  const totalQuantity = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Stack
      direction='column'
      sx={{
        width: '280px',
        display: { xs: 'none', md: 'flex' },
        px: 2,
        position: 'sticky',
        height: '100%',
        top: '100px'
      }}
    >
      <Typography
        color='primary'
        variant='h5'
        sx={{
          fontWeight: 500
        }}
      >
        Order Summary
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ width: '100%', my: 1 }}>
        <Stack direction='row' sx={{ width: '100%' }}>
          <Typography variant='body1' color='text.primary' sx={{ flexGrow: 1 }}>
            Subtotal
          </Typography>
          <Typography variant='body1' color='text.primary'>
            {formatPrice(totalPrice)}
          </Typography>
        </Stack>
        <Typography variant='body2' color='text.secondary'>
          {totalQuantity} items(s)
        </Typography>
      </Box>

      <Box sx={{ width: '100%', my: 1 }}>
        <Stack direction='row' sx={{ width: '100%' }}>
          <Typography variant='body1' color='text.primary' sx={{ flexGrow: 1 }}>
            Shipping
          </Typography>
          <Typography variant='body1' color='text.primary'>
            FREE
          </Typography>
        </Stack>
        <Typography variant='body2' color='text.secondary'>
          Fulfilled by Yami
        </Typography>
      </Box>

      <Box sx={{ width: '100%', my: 1 }}>
        <Stack direction='row' sx={{ width: '100%' }}>
          <Typography variant='body1' color='text.primary' sx={{ flexGrow: 1 }}>
            Tax
          </Typography>
          <Typography variant='body1' color='text.primary'>
            TBD
          </Typography>
        </Stack>
        <Typography variant='body2' color='text.secondary'>
          Calculated in Checkout
        </Typography>
      </Box>

      <BlackDivider sx={{ my: 3 }} />

      <Button
        component={RouterLink}
        to='/checkout'
        variant='contained'
        disableRipple
        disableFocusRipple
        disableElevation
        size='large'
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
