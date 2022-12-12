import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi } from '../api/authApi';
import { shoppingCartApi } from '../api/shoppingcartApi';
import { User, getProfileQuery, userApi } from '../api/userApi';
import { UserPasswordFormData } from '../containers/Account/UserPassword';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
  clearShoppingCart,
  overwriteShoppingCart
} from '../reducers/shoppingCart/shoppingCartSlice';
import { removeUser, setUser } from '../reducers/user/userSlice';

export type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<{
  user: User;
  login: (
    email: string,
    password: string,
    callbackUrl?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (user: Partial<User>) => Promise<void>;
  resetPassword: (data: UserPasswordFormData) => Promise<void>;
}>({
  user: {
    id: '',
    email: '',
    first_name: null,
    last_name: null,
    gender: null
  },
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateUserProfile: () => Promise.resolve(),
  resetPassword: () => Promise.resolve()
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, shoppingCart } = useAppSelector(state => ({
    user: state.user,
    shoppingCart: state.shoppingCart
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useQuery({
    ...getProfileQuery(!!user.id),
    onSuccess: newUser => {
      dispatch(setUser(newUser));
    },
    onError: () => {
      dispatch(removeUser());
      dispatch(clearShoppingCart());
      navigate('/login');
    }
  });

  const updateUserProfileQuery = useMutation({
    mutationFn: async (user: Partial<User>) => userApi.updateProfile(user),
    onSuccess: async () => {
      await queryClient.invalidateQueries(getProfileQuery(!!user.id));
      dispatch(setUser(user));
    }
  });

  const login = async (
    email: string,
    password: string,
    callbackUrl?: string
  ) => {
    try {
      const user = await authApi.login(email, password);
      await shoppingCartApi.upsertEntire(shoppingCart);
      const newShoppingCart = await shoppingCartApi.get();
      dispatch(overwriteShoppingCart(newShoppingCart));
      dispatch(setUser(user));
      navigate(callbackUrl || '/', { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Invalid email or password');
      } else {
        throw new Error('Unknown error');
      }
    }
  };

  const logout = async () => {
    await authApi.logout();
    dispatch(removeUser());
    dispatch(clearShoppingCart());
    navigate('/');
  };

  const resetPassword = async (data: UserPasswordFormData) => {
    try {
      await authApi.resetPassword(data);
      dispatch(removeUser());
      dispatch(clearShoppingCart());
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Wrong password');
      } else {
        throw new Error('Unknown error');
      }
    }
  };

  const updateUserProfile = async (user: Partial<User>) => {
    await updateUserProfileQuery.mutateAsync(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUserProfile, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
