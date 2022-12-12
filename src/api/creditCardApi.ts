import { UseQueryOptions } from '@tanstack/react-query';

import { AddressFormData } from '../containers/Form/AddressForm';
import { CreditCardFormData } from '../containers/Form/CreditCardForm';
import { basicInstance, secureInstance } from '../utils/axiosInstance';
import { Address } from './addressApi';

export type CreditCard = {
  id: string;
  user_id: string;
  card_type: string;
  card_number: string;
  card_holder_name: string;
  card_expiry_month: number;
  card_expiry_year: number;
  cvv_code: string;
  billing_address: Address;
  created_at: number;
  updated_at: number;
};

export const getCreditCards = async () => {
  const response = await basicInstance.get<{ items: CreditCard[] }>(
    '/creditcard'
  );
  return response.data.items;
};

export const getCreditCardsQuery = () =>
  ({
    queryKey: ['creditcards'],
    queryFn: async () => {
      return await getCreditCards();
    },
    refetchOnWindowFocus: false
  } as UseQueryOptions<CreditCard[]>);

export const createCreditCard = async (
  creditCard: CreditCardFormData & {
    card_expiry_month: string;
    card_expiry_year: string;
  },
  billingAddress: AddressFormData
) => {
  const response = await secureInstance.post('/creditcard', {
    credit_card: creditCard,
    billing_address: billingAddress
  });
  return response.data;
};

export const updateCreditCard = async (
  id: string,
  creditCard: CreditCardFormData & {
    card_expiry_month: string;
    card_expiry_year: string;
  },
  billingAddress: AddressFormData
) => {
  const response = await secureInstance.put(`/creditcard/${id}`, {
    credit_card: creditCard,
    billing_address: billingAddress
  });
  return response.data;
};

export const deleteCreditCard = async (id: string) => {
  const response = await secureInstance.delete(`/creditcard/${id}`);
  return response.data;
};

export const creditCardApi = {
  getAll: getCreditCards,
  create: createCreditCard,
  update: updateCreditCard,
  delete: deleteCreditCard
};
