import { secureInstance } from '../utils/axiosInstance';

export type ShoppingCartProduct = {
  product_id: string;
  name: string;
  quantity: number;
  list_price: number;
  image_url: string;
  category_id: string;
};

const getShoppingCart = async () => {
  const response = await secureInstance.get<{ items: ShoppingCartProduct[] }>(
    '/shoppingcart'
  );
  return response.data.items;
};

const clearShoppingCart = async () => {
  const response = await secureInstance.get('/shoppingcart/clear');
  return response.data;
};

const updateShoppingCartProduct = async (
  productId: string,
  quantity: number
) => {
  const response = await secureInstance.put(`/shoppingcart/${productId}`, {
    quantity
  });
  return response.data;
};

const upsertEntireShoppingCart = async (
  shoppingCart: ShoppingCartProduct[]
) => {
  const response = await secureInstance.post('/shoppingcart', {
    items: shoppingCart
  });
  return response.data;
};

const deleteShoppingCartProduct = async (productId: string) => {
  const response = await secureInstance.delete(`/shoppingcart/${productId}`);
  return response.data;
};

export const shoppingCartApi = {
  get: getShoppingCart,
  updateProduct: updateShoppingCartProduct,
  upsertEntire: upsertEntireShoppingCart,
  deleteProduct: deleteShoppingCartProduct,
  clear: clearShoppingCart
};
