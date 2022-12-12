/* eslint-disable @typescript-eslint/no-empty-function */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as _ from 'lodash';
import { useSnackbar } from 'notistack';
import React, { createContext, useEffect } from 'react';

import { Product } from '../api/productApi';
import { getSaveForLaterQuery, saveForLaterApi } from '../api/saveForLaterApi';
import { shoppingCartApi } from '../api/shoppingcartApi';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
  addToShoppingCart,
  overwriteShoppingCart,
  removeFromShoppingCart,
  updateShoppingCart
} from '../reducers/shoppingCart/shoppingCartSlice';

export type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

const ShoppingCartContext = createContext<{
  add: (product: Product, quantity: number) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  updateSaveForLater: (productId: string) => void;
  deleteSaveForLater: (productId: string) => void;
}>({
  add: () => {},
  update: () => {},
  remove: () => {},
  updateSaveForLater: () => {},
  deleteSaveForLater: () => {}
});

const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  children
}) => {
  const { user, shoppingCart } = useAppSelector(state => ({
    user: state.user,
    shoppingCart: state.shoppingCart
  }));
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user.id) {
      console.log('test');
      shoppingCartApi.get().then(shoppingCart => {
        dispatch(overwriteShoppingCart(shoppingCart));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const updateRemoteShoppingCartProductQuery = useMutation({
    mutationFn: async ({
      productId,
      quantity
    }: {
      productId: string;
      quantity: number;
    }) => shoppingCartApi.updateProduct(productId, quantity)
  });

  const deleteRemoteShoppingCartProductQuery = useMutation({
    mutationFn: async ({ productId }: { productId: string }) =>
      shoppingCartApi.deleteProduct(productId)
  });

  const updateSaveForLaterQuery = useMutation({
    mutationFn: async ({ productId }: { productId: string }) =>
      saveForLaterApi.update(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getSaveForLaterQuery(!!user.id));
    }
  });

  const deleteSaveForLaterQuery = useMutation({
    mutationFn: async ({ productId }: { productId: string }) =>
      saveForLaterApi.delete(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getSaveForLaterQuery(!!user.id));
    }
  });

  const add = (product: Product, quantity: number) => {
    dispatch(addToShoppingCart({ product, quantity }));
    enqueueSnackbar('Product added to cart', {
      variant: 'success'
    });

    if (user.id) {
      const oldProduct = shoppingCart.find(
        item => item.product_id === product.id
      );

      console.log(product.id);
      console.log(oldProduct?.quantity, quantity);
      _.debounce(() => {
        updateRemoteShoppingCartProductQuery.mutate({
          productId: product.id,
          quantity: quantity + (oldProduct?.quantity || 0)
        });
      }, 500)();
    }
  };

  const update = (productId: string, quantity: number) => {
    dispatch(updateShoppingCart({ productId, quantity }));
    enqueueSnackbar('Product updated in cart', {
      variant: 'warning'
    });

    if (user.id) {
      const oldProduct = shoppingCart.find(
        item => item.product_id === productId
      );

      if (oldProduct?.quantity !== quantity) {
        updateRemoteShoppingCartProductQuery.mutate({
          productId,
          quantity
        });
      }
    }
  };

  const remove = (productId: string) => {
    dispatch(removeFromShoppingCart(productId));

    enqueueSnackbar('Product removed from cart', {
      variant: 'error'
    });

    if (user.id) {
      deleteRemoteShoppingCartProductQuery.mutate({
        productId
      });
    }
  };

  const updateSaveForLater = (productId: string) => {
    if (user.id) {
      updateSaveForLaterQuery.mutate({
        productId
      });
    }
  };

  const deleteSaveForLater = (productId: string) => {
    if (user.id) {
      deleteSaveForLaterQuery.mutate({
        productId
      });
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        add,
        update,
        remove,
        updateSaveForLater,
        deleteSaveForLater
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingCartProvider };
