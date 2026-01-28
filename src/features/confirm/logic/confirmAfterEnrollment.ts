import { api } from '@/shared/api';

export const confirmAfterEnrollment = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isFromEnrollment = urlParams.get('type') === 'enrollment';
  const emailValue = urlParams.get('email');

  const {
    error,
    data: { session },
  } = await api.auth.getSession();

  if (session && emailValue && isFromEnrollment) return emailValue;

  if (error) throw error;

  return '';
};
