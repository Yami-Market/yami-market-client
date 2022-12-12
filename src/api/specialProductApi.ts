import { UseQueryOptions } from '@tanstack/react-query';

import { basicInstance } from '../utils/axiosInstance';
import { Product } from './productApi';

export const getLimitedProduct = async () => {
  const response = await basicInstance.get<{ items: Product[] }>(
    '/special/limited'
  );
  return response.data.items;
};

export const getLimitedProductQuery = () =>
  ({
    queryKey: ['limitedProduct'],
    queryFn: getLimitedProduct,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 120,
    refetchOnMount: false
  } as UseQueryOptions<Product[]>);

export const getBestProduct = async () => {
  const response = await basicInstance.get<{ items: Product[] }>(
    '/special/best'
  );
  return response.data.items;
};

export const getBestProductQuery = () =>
  ({
    queryKey: ['bestProduct'],
    queryFn: getBestProduct,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 120,
    refetchOnMount: false
  } as UseQueryOptions<Product[]>);

export const getFastProduct = async () => {
  const response = await basicInstance.get<{ items: Product[] }>(
    '/special/fast'
  );
  return response.data.items;
};

export const getFastProductQuery = () =>
  ({
    queryKey: ['fastProduct'],
    queryFn: getFastProduct,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 120,
    refetchOnMount: false
  } as UseQueryOptions<Product[]>);

export const getRecommendedProduct = async () => {
  const response = await basicInstance.get<{ items: Product[] }>(
    '/special/recommended'
  );
  return response.data.items;
};

export const getRecommendedProductQuery = () =>
  ({
    queryKey: ['recommendedProduct'],
    queryFn: getRecommendedProduct,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 120,
    refetchOnMount: false
  } as UseQueryOptions<Product[]>);

export const specialProductApi = {
  getLimited: getLimitedProduct,
  getBest: getBestProduct,
  getFast: getFastProduct,
  getRecommended: getRecommendedProduct
};
