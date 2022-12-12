import { combineReducers } from '@reduxjs/toolkit';

import { checkoutSlice } from './checkout/checkoutReducer';
import { shoppingCartSlice } from './shoppingCart/shoppingCartSlice';
import { userSlice } from './user/userSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  checkout: checkoutSlice.reducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
