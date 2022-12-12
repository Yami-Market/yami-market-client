import { useContext } from 'react';

import { ShoppingCartContext } from '../providers/ShoppingCartProvider';

const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export default useShoppingCart;
