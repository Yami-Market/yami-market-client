import { UseQueryOptions } from '@tanstack/react-query';

import { AddressFormData } from '../containers/Form/AddressForm';
import { basicInstance, secureInstance } from '../utils/axiosInstance';

export type Address = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  street_address: string;
  optional_address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  phone_number: string;
  email: string;
  created_at: number;
  updated_at: number;
};

export const getShippingAddresses = async () => {
  const response = await basicInstance.get<{ items: Address[] }>(
    '/shippingaddress'
  );
  return response.data.items;
};

export const getShippingAddressesQuery = () =>
  ({
    queryKey: ['addresses'],
    queryFn: async () => {
      return await getShippingAddresses();
    },
    refetchOnWindowFocus: false
  } as UseQueryOptions<Address[]>);

export const createAddress = async (address: AddressFormData) => {
  const response = await secureInstance.post('/address', address);
  return response.data;
};

export const updateAddress = async (id: string, address: AddressFormData) => {
  const response = await secureInstance.put(`/address/${id}`, address);
  return response.data;
};

export const deleteAddress = async (id: string) => {
  const response = await secureInstance.delete(`/address/${id}`);
  return response.data;
};

export const addressApi = {
  getAll: getShippingAddresses,
  create: createAddress,
  update: updateAddress,
  delete: deleteAddress
};
