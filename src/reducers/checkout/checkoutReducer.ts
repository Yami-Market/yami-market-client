import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Address } from '../../api/addressApi';
import { CreditCard } from '../../api/creditCardApi';

export type CheckoutState = {
  selectedAddress: Address | null;
  changingAddress: boolean;
  selectedCreditCard: CreditCard | null;
  changingCreditCard: boolean;
  shippingType: 'Standard' | 'Express';
};

const initialState: CheckoutState = {
  selectedAddress: null,
  changingAddress: false,
  selectedCreditCard: null,
  changingCreditCard: false,
  shippingType: 'Standard'
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setSelectedAddress: (state, action: PayloadAction<Address | null>) => {
      state.selectedAddress = action.payload;
    },
    setSelectedCreditCard: (
      state,
      action: PayloadAction<CreditCard | null>
    ) => {
      state.selectedCreditCard = action.payload;
    },
    setChangingAddress: (state, action: PayloadAction<boolean>) => {
      state.changingAddress = action.payload;
    },
    setChangingCreditCard: (state, action: PayloadAction<boolean>) => {
      state.changingCreditCard = action.payload;
    },
    setShippingType: (state, action: PayloadAction<'Standard' | 'Express'>) => {
      state.shippingType = action.payload;
    }
  }
});

export const {
  setSelectedAddress,
  setSelectedCreditCard,
  setChangingCreditCard,
  setChangingAddress,
  setShippingType
} = checkoutSlice.actions;
