import { APP_ROUTES } from '@/shared/config';
import { api } from '@/shared/api';
import type { Enrollment } from '../models';

export const sendEnrollmentRequest = async (dataToServer: Enrollment.BodyData) => {
  const { data, error } = await api.auth.signUp({
    ...dataToServer,
    options: { emailRedirectTo: `${window.location.origin}${APP_ROUTES.CONFIRM}` },
  });

  if (error) throw error;

  return data;
};
