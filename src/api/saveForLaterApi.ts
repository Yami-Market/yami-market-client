import { UseQueryOptions } from '@tanstack/react-query';

import { basicInstance, secureInstance } from '../utils/axiosInstance';

export type SaveForLaterProduct = {
  product_id: string;
  name: string;
  list_price: number;
  category_id: string;
  image_url: string;
  created_at: number;
};

const getSaveForLater = async () => {
  const response = await basicInstance.get<{ items: SaveForLaterProduct[] }>(
    '/savelater'
  );
  return response.data.items;
};

export const getSaveForLaterQuery = (enabled: boolean) =>
  ({
    queryKey: ['savelater'],
    queryFn: async () => {
      return await getSaveForLater();
    },
    refetchOnWindowFocus: false,
    enabled
  } as UseQueryOptions<SaveForLaterProduct[]>);

const updateSaveForLater = async (productId: string) => {
  const response = await secureInstance.put(`/savelater/${productId}`);
  return response.data;
};

const deleteSaveForLater = async (productId: string) => {
  const response = await secureInstance.delete(`/savelater/${productId}`);
  return response.data;
};

export const saveForLaterApi = {
  get: getSaveForLater,
  update: updateSaveForLater,
  delete: deleteSaveForLater
};
