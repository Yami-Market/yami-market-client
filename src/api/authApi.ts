import { UserPasswordFormData } from '../containers/Account/UserPassword';
import { basicInstance, secureInstance } from '../utils/axiosInstance';
import { User } from './userApi';

const signup = async (email: string, password: string) => {
  const response = await basicInstance.post<{ message: string }>('/signup', {
    email,
    password
  });
  return response.data;
};

const login = async (email: string, password: string) => {
  const response = await basicInstance.post<{ message: string; user: User }>(
    '/login',
    {
      email,
      password
    }
  );
  return response.data.user;
};

const logout = async () => {
  const response = await basicInstance.post<{ message: string }>('/logout');
  return response.data;
};

export const resetPassword = async (data: UserPasswordFormData) => {
  const response = await secureInstance.post('/resetpassword', data);
  return response.data;
};

export const authApi = {
  signup,
  login,
  logout,
  resetPassword
};
