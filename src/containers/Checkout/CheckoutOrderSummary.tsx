import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import { NewOrder, getOrderListQuery, orderApi } from '../../api/orderApi';
import { shoppingCartApi } from '../../api/shoppingcartApi';
import BlackDivider from '../../components/Divider/BlackDivider';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  setChangingAddress,
  setSelectedAddress,
  setSelectedCreditCard
} from '../../reducers/checkout/checkoutReducer';
import { clearShoppingCart } from '../../reducers/shoppingCart/shoppingCartSlice';
import { formatPrice } from '../../utils/string';

const CartOrderSummary = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const shoppingCart = useAppSelector(state => state.shoppingCart);
  const { shippingType } = useAppSelector(state => state.checkout);
  const { selectedAddress, selectedCreditCard } = useAppSelector(
    state => state.checkout
  );

  const createOrderQuery = useMutation({
    mutationFn: async (order: NewOrder) => orderApi.create(order),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getOrderListQuery());
    }
  });

  const subtotalPrice = shoppingCart.reduce(
    (total, item) => total + item.list_price * item.quantity,
    0
  );

  const totalQuantity = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const shippingPrice = shippingType === 'Standard' ? 0 : 10;

  const totalPrice = subtotalPrice + shippingPrice;

  const handlePlaceOrder = async () => {
    console.log(selectedCreditCard, selectedAddress);
    console.log(shoppingCart);
    if (selectedCreditCard && selectedAddress) {
      const newOrder = await createOrderQuery.mutateAsync({
        shipping_address_id: selectedAddress.id,
        credit_card_id: selectedCreditCard.id,
        shipping_fee: shippingType === 'Standard' ? 0 : 10,
        products: shoppingCart
      });

      await shoppingCartApi.clear();

      dispatch(clearShoppingCart());
      dispatch(setChangingAddress(false));
      dispatch(setChangingAddress(false));
      dispatch(setSelectedAddress(null));
      dispatch(setSelectedCreditCard(null));

      navigate('/confirmation', {
        replace: true,
        state: {
          order: newOrder,
          shippingAddress: selectedAddress
        }
      });
    }
  };

  return (
    <Stack
      direction='column'
      sx={{
        px: 2,
        width: '280px',
        display: { xs: 'none', md: 'flex' },
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
            {formatPrice(subtotalPrice)}
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
            {shippingType === 'Standard' ? 'FREE' : formatPrice(8)}
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
            {formatPrice(subtotalPrice * 0.1)}
          </Typography>
        </Stack>
      </Box>

      <BlackDivider sx={{ mt: 2 }} />

      <Box sx={{ width: '100%', my: 3 }}>
        <Stack direction='row' sx={{ width: '100%' }}>
          <Typography variant='body1' color='text.primary' sx={{ flexGrow: 1 }}>
            Total
          </Typography>
          <Typography
            variant='body1'
            color='text.primary'
            sx={{
              fontWeight: 500
            }}
          >
            {formatPrice(totalPrice)}
          </Typography>
        </Stack>
      </Box>

      <Button
        disabled={selectedAddress === null || selectedCreditCard === null}
        variant='contained'
        disableRipple
        disableFocusRipple
        disableElevation
        size='large'
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
