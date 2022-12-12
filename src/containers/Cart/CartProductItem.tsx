import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import useAuth from '../../hooks/useAuth';
import useShoppingCart from '../../hooks/useShoppingCart';
import { ShoppingCartItem } from '../../reducers/shoppingCart/shoppingCartSlice';
import { formatPrice } from '../../utils/string';
import CartProductQuantityInput from '../Form/ProductQuantityInput';

export type CartProductItemProps = {
  product: ShoppingCartItem;
};

const CartProductItem = ({ product }: CartProductItemProps) => {
  const shoppingCart = useShoppingCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleKeyDown = (quantity: number) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(quantity);
      shoppingCart.update(product.product_id, quantity);
    }
  };

  const handleUpdateCart = (quantity: number) => {
    shoppingCart.update(product.product_id, quantity);
  };

  const handleRemove = () => {
    shoppingCart.remove(product.product_id);
  };

  const handleSaveForLater = () => {
    if (!user.id) {
      navigate('/login');
      return;
    } else {
      shoppingCart.remove(product.product_id);
      shoppingCart.updateSaveForLater(product.product_id);
    }
  };

  return (
    <>
      <Stack direction='row' sx={{ py: 2, alignItems: 'center' }}>
        <Stack sx={{ width: '100px', height: '120px' }}>
          <Box
            component={RouterLink}
            to={`/product/${product.product_id}`}
            sx={{ display: 'flex', width: '100%', height: '100%' }}
          >
            <img
              draggable={false}
              src={product.image_url}
              alt='alt'
              style={{
                objectFit: 'cover',
                borderRadius: '6px',
                width: '80%',
                height: '80%',
                margin: 'auto'
              }}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            maxWidth: '400px',
            minWidth: '400px',
            height: '100%',
            justifyContent: 'space-evenly',
            flexGrow: 1,
            pl: 2,
            pt: 2
          }}
        >
          <Typography
            component={RouterLink}
            to={`/product/${product.product_id}`}
            color='text.primary'
            variant='body1'
            sx={{ fontWeight: 500, textDecoration: 'none' }}
          >
            {product.name}
          </Typography>
          <Box>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                pr: 2,
                display: 'inline',
                textDecoration: 'underline',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={handleRemove}
            >
              Remove
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                display: 'inline',
                textDecoration: 'underline',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={handleSaveForLater}
            >
              Save for later
            </Typography>
          </Box>
        </Stack>

        <Stack sx={{ flexGrow: 1, alignItems: 'center' }}>
          <CartProductQuantityInput
            quantity={product.quantity}
            handleKeyDown={handleKeyDown}
            handleProductSubmit={handleUpdateCart}
            handleInputBlur={handleUpdateCart}
            handleMenuChange={handleUpdateCart}
            autoFocus={false}
          />
        </Stack>

        <Stack sx={{ flexGrow: 1, alignItems: 'flex-end', pr: 2 }}>
          <Typography variant='body1' color='primary' sx={{ fontWeight: 500 }}>
            {formatPrice(product.list_price)}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default CartProductItem;
