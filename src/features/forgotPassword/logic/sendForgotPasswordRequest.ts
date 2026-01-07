import { api } from '@/shared/api';
import { APP_ROUTES } from '@/shared/config';

export const sendForgotPasswordRequest = async (email: string) => {
  const { data, error } = await api.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${APP_ROUTES.RECOVERY_PASSWORD}`,
  });

  if (error) throw error;

  return data;
};
