import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../../api/userApi';

const initialState: User = {
  id: '',
  email: '',
  first_name: null,
  last_name: null,
  gender: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    removeUser: () => initialState
  }
});

export const { setUser, updateUser, removeUser } = userSlice.actions;
