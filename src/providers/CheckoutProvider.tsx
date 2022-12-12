/* eslint-disable @typescript-eslint/no-empty-function */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { createContext } from 'react';

import { addressApi, getShippingAddressesQuery } from '../api/addressApi';
import { creditCardApi, getCreditCardsQuery } from '../api/creditCardApi';
import Loading from '../components/Backdrop/Loading';
import { AddressFormData } from '../containers/Form/AddressForm';
import { CreditCardFormData } from '../containers/Form/CreditCardForm';

export type CheckoutProviderProps = {
  children: React.ReactNode;
};

const CheckoutContext = createContext<{
  // Address
  createAddress: (address: AddressFormData) => Promise<void>;
  updateAddress: (id: string, address: AddressFormData) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  // Credit Card
  createCreditCard: (
    creditCard: CreditCardFormData & {
      card_expiry_month: string;
      card_expiry_year: string;
    },
    billingAddress: AddressFormData
  ) => Promise<void>;
  updateCreditCard: (
    id: string,
    creditCard: CreditCardFormData & {
      card_expiry_month: string;
      card_expiry_year: string;
    },
    billingAddress: AddressFormData
  ) => Promise<void>;
  deleteCreditCard: (id: string) => Promise<void>;
}>({
  // Address
  createAddress: async () => {},
  updateAddress: async () => {},
  deleteAddress: async () => {},
  // Credit Card
  createCreditCard: async () => {},
  updateCreditCard: async () => {},
  deleteCreditCard: async () => {}
});

const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const addressesQuery = useQuery(getShippingAddressesQuery());
  const creditCardQuery = useQuery(getCreditCardsQuery());

  const createAddressQuery = useMutation({
    mutationFn: async ({ address }: { address: AddressFormData }) =>
      addressApi.create(address),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getShippingAddressesQuery());
    }
  });

  const updateAddressQuery = useMutation({
    mutationFn: async ({
      id,
      address
    }: {
      id: string;
      address: AddressFormData;
    }) => addressApi.update(id, address),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getShippingAddressesQuery());
    }
  });

  const deleteAddressQuery = useMutation({
    mutationFn: async ({ id }: { id: string }) => addressApi.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getShippingAddressesQuery());
    }
  });

  const createCreditCardQuery = useMutation({
    mutationFn: async ({
      creditCard,
      billingAddress
    }: {
      creditCard: CreditCardFormData & {
        card_expiry_month: string;
        card_expiry_year: string;
      };
      billingAddress: AddressFormData;
    }) => creditCardApi.create(creditCard, billingAddress),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getCreditCardsQuery());
    }
  });

  const updateCreditCardQuery = useMutation({
    mutationFn: async ({
      id,
      creditCard,
      billingAddress
    }: {
      id: string;
      creditCard: CreditCardFormData & {
        card_expiry_month: string;
        card_expiry_year: string;
      };
      billingAddress: AddressFormData;
    }) => creditCardApi.update(id, creditCard, billingAddress),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getCreditCardsQuery());
    }
  });

  const deleteCreditCardQuery = useMutation({
    mutationFn: async ({ id }: { id: string }) => creditCardApi.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getCreditCardsQuery());
    }
  });

  if (addressesQuery.isLoading || creditCardQuery.isLoading) {
    return <Loading />;
  }

  const createAddress = async (address: AddressFormData) => {
    await createAddressQuery.mutateAsync({
      address
    });
  };

  const updateAddress = async (id: string, address: AddressFormData) => {
    await updateAddressQuery.mutateAsync({
      id,
      address
    });
  };

  const deleteAddress = async (id: string) => {
    await deleteAddressQuery.mutateAsync({
      id
    });
  };

  const createCreditCard = async (
    creditCard: CreditCardFormData & {
      card_expiry_month: string;
      card_expiry_year: string;
    },
    billingAddress: AddressFormData
  ) => {
    await createCreditCardQuery.mutateAsync({
      creditCard,
      billingAddress
    });
  };

  const updateCreditCard = async (
    id: string,
    creditCard: CreditCardFormData & {
      card_expiry_month: string;
      card_expiry_year: string;
    },
    billingAddress: AddressFormData
  ) => {
    await updateCreditCardQuery.mutateAsync({
      id,
      creditCard,
      billingAddress
    });
  };

  const deleteCreditCard = async (id: string) => {
    await deleteCreditCardQuery.mutateAsync({
      id
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
        // Address
        createAddress,
        updateAddress,
        deleteAddress,
        // Credit Card
        createCreditCard,
        updateCreditCard,
        deleteCreditCard
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext, CheckoutProvider };
