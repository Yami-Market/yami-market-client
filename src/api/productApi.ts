import { UseQueryOptions } from '@tanstack/react-query';

import { basicInstance } from '../utils/axiosInstance';
import { ProductCategory } from './categoryApi';

export type Product = {
  id: string;
  name: string;
  list_price: number;
  category_id: string;
  image_url: string;
};

export type ProductWithExtra = {
  product_detail: Product;
  categories: ProductCategory;
  image_urls: string[];
};

const getProduct = async (productId: string) => {
  const response = await basicInstance.get<ProductWithExtra>(
    `/product/${productId}`
  );
  return response.data;
};

export const getProductQuery = (productId: string | undefined) =>
  ({
    queryKey: ['product', productId],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return await getProduct(productId!);
    },
    enabled: !!productId,
    refetchOnWindowFocus: false,
    retry: 1
  } as UseQueryOptions<ProductWithExtra>);

export const productApi = {
  get: getProduct
};
