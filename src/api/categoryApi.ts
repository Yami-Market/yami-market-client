import { UseQueryOptions } from '@tanstack/react-query';

import { basicInstance } from '../utils/axiosInstance';
import { Product } from './productApi';

export type Category = {
  id: string;
  name: string;
  parent_id: string | null;
  parent_name: string | null;
  level: number;
};

export type ProductCategory = {
  level_1_id: string;
  level_1_name: string;
  level_2_id: string;
  level_2_name: string;
  level_3_id: string;
  level_3_name: string;
};

export type CategoryPath = {
  id: string;
  name: string;
  grandparent_id: string | null;
  grandparent_name: string | null;
  parent_id: string | null;
  parent_name: string | null;
  level: number;
};

export type ProductPagination = {
  category_id: string;
  category_level: number;
  category_name: string;
  category_path: CategoryPath;
  page: number;
  products: Product[];
  total: number;
};

const getCategory = async () => {
  const response = await basicInstance.get<{ items: Category[] }>('/category');
  return response.data.items;
};

export const getCategoryQuery = () =>
  ({
    queryKey: ['category'],
    queryFn: getCategory,
    refetchOnWindowFocus: false
  } as UseQueryOptions<Category[]>);

const getAllProductByCategoryId = async (categoryId: string, page = 1) => {
  const response = await basicInstance.get<ProductPagination>(
    `/category/${categoryId}?page=${page}`
  );
  return response.data;
};

export const getAllProductByCategoryIdQuery = (
  categoryId: string,
  page: number
) =>
  ({
    queryKey: ['category', categoryId, page],
    queryFn: () => getAllProductByCategoryId(categoryId, page),
    refetchOnWindowFocus: false
  } as UseQueryOptions<ProductPagination>);

export const categoryApi = {
  get: getCategory,
  getAllProduct: getAllProductByCategoryId
};
