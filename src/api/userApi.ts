import { UseQueryOptions } from '@tanstack/react-query';

import { basicInstance, secureInstance } from '../utils/axiosInstance';

export type User = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
};

const getProfile = async () => {
  const response = await basicInstance.get<User>('/profile');
  return response.data;
};

export const getProfileQuery = (enabled: boolean) =>
  ({
    queryKey: ['profile'],
    queryFn: async () => {
      return await getProfile();
    },
    retry: 1,
    enabled,
    refetchOnWindowFocus: true
  } as UseQueryOptions<User>);

export const updateProfile = async (data: Partial<User>) => {
  const response = await secureInstance.post<User>('/profile', data);
  return response.data;
};

export const userApi = {
  getProfile,
  updateProfile
};
