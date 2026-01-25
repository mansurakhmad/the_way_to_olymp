import { api } from '@/shared/api';

export const sendRecoveryPasswordRequest = async (password: string) => {
  const { data, error } = await api.auth.updateUser({ password });

  if (error) throw error;

  return data;
};
