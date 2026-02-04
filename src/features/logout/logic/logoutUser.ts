import { api } from '@/shared/api';

export const logoutUser = async () => {
  const { error } = await api.auth.signOut();

  if (error) throw error;
};
