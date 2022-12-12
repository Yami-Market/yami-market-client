import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Product } from '../../api/productApi';

export type ShoppingCartItem = {
  product_id: string;
  name: string;
  list_price: number;
  category_id: string;
  image_url: string;
  quantity: number;
};

const initialState: ShoppingCartItem[] = [];

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToShoppingCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existedProduct = state.find(item => item.product_id === product.id);
      if (existedProduct) {
        existedProduct.quantity += quantity;
      } else {
        const item = { ...product, id: undefined };
        state.push({
          ...item,
          product_id: product.id,
          quantity
        });
      }
    },
    updateShoppingCart: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const existedProduct = state.find(item => item.product_id === productId);
      if (existedProduct) {
        existedProduct.quantity = quantity;
      }
    },
    overwriteShoppingCart: (
      state,
      action: PayloadAction<ShoppingCartItem[]>
    ) => {
      return action.payload;
    },
    removeFromShoppingCart: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.product_id !== action.payload);
    },
    clearShoppingCart: () => initialState
  }
});

export const {
  addToShoppingCart,
  updateShoppingCart,
  overwriteShoppingCart,
  removeFromShoppingCart,
  clearShoppingCart
} = shoppingCartSlice.actions;
