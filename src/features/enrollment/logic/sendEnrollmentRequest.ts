import type { Enrollment } from '../models';

import { api } from '@/shared/api';
import { APP_ROUTES } from '@/shared/config';

export const sendEnrollmentRequest = async (bodyData: Enrollment.BodyData) => {
  const { data, error } = await api.auth.signUp({
    ...bodyData,
    options: { emailRedirectTo: `${window.location.origin}${APP_ROUTES.CONFIRM}` },
  });

  if (error) throw error;

  if (!data.user?.user_metadata.email) {
    throw {
      name: 'Registration error',
      message: `Email already exist`,
    };
  }

  return data;
};
