import React from 'react';

import { Button, Stack } from '@mui/material';

import { Product } from '../../api/productApi';
import useShoppingCart from '../../hooks/useShoppingCart';
import ProductQuantityInput from '../Form/ProductQuantityInput';

export type AddToCartProps = {
  product: Product;
};

const AddToCart = ({ product }: AddToCartProps) => {
  const shoppingCart = useShoppingCart();

  const handleKeyDown = () => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleAddToCart = (quantity: number) => {
    shoppingCart.add(product, quantity);
  };

  return (
    <Stack direction='row'>
      <ProductQuantityInput
        sx={{ width: 110, mr: 2 }}
        handleKeyDown={handleKeyDown}
        handleProductSubmit={handleAddToCart}
        autoFocus
      />
      <Button
        type='submit'
        form='product-quantity-form'
        variant='contained'
        disableElevation
        sx={{ width: '300px', maxHeight: '40px' }}
      >
        Add To Cart
      </Button>
    </Stack>
  );
};

export default AddToCart;
