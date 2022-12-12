import { Divider, Stack } from '@mui/material';

import { ShoppingCartItem } from '../../reducers/shoppingCart/shoppingCartSlice';
import CartProductItem from './CartProductItem';

export type CartProductListProps = {
  shoppingCart: ShoppingCartItem[];
};

const CartProductList = ({ shoppingCart }: CartProductListProps) => {
  return (
    <Stack direction='column' divider={<Divider />} sx={{ mx: 5, flexGrow: 1 }}>
      {shoppingCart.map(item => (
        <CartProductItem key={item.product_id} product={item} />
      ))}
    </Stack>
  );
};

export default CartProductList;
