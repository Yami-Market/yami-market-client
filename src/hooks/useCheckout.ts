import { useContext } from 'react';

import { CheckoutContext } from '../providers/CheckoutProvider';

const useCheckout = () => {
  return useContext(CheckoutContext);
};

export default useCheckout;
