import { UseQueryOptions } from '@tanstack/react-query';

import { basicInstance, secureInstance } from '../utils/axiosInstance';
import { Address } from './addressApi';
import { CreditCard } from './creditCardApi';
import { ShoppingCartProduct } from './shoppingcartApi';

export type NewOrderResponse = {
  id: string;
  order_date: number;
  payment_date: number;
  ship_date: number;
  shipping_fee: number;
  tax_rate: number;
  user_id: string;
  credit_card_id: string;
  shipping_address_id: string;
};

export type OrderProduct = {
  id: string;
  order_id: string;
  name: string;
  list_price: number;
  category_id: string;
  image_url: string;
  unit_price: number;
  order_quantity: number;
};

export type Order = {
  id: string;
  order_date: number;
  payment_date: number;
  ship_date: number | null;
  shipping_fee: number;
  tax_rate: number;
  subtotal_price: number;
  products: OrderProduct[];
  shipping_address: Address;
  credit_card: CreditCard;
};

export type NewOrder = {
  shipping_address_id: string;
  credit_card_id: string;
  shipping_fee: number;
  products: ShoppingCartProduct[];
};

const getOrder = async (orderId: string) => {
  const response = await basicInstance.get<Order>(`/order/${orderId}`);
  return response.data;
};

export const getOrderQuery = (orderId: string | undefined) =>
  ({
    queryKey: ['order', orderId],
    queryFn: () => {
      if (orderId) {
        return getOrder(orderId);
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!orderId
  } as UseQueryOptions<Order>);

const getOrderList = async () => {
  const response = await basicInstance.get<{ items: Order[] }>('/order');
  return response.data.items;
};

export const getOrderListQuery = () =>
  ({
    queryKey: ['orderList'],
    queryFn: async () => {
      return await getOrderList();
    },
    refetchOnWindowFocus: false
  } as UseQueryOptions<Order[]>);

const createOrder = async (order: NewOrder) => {
  const response = await secureInstance.post<NewOrderResponse>('/order', order);
  return response.data;
};

export const orderApi = {
  get: getOrder,
  getList: getOrderList,
  create: createOrder
};
