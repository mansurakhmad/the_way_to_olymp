import { api } from '@/shared/api';

export const sendRestorePasswordRequest = async (password: string) => {
  const { data, error } = await api.auth.updateUser({ password });

  if (error) throw error;

  return data;
};
