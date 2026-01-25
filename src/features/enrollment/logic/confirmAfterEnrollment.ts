import { api } from '@/shared/api';

export const confirmAfterEnrollment = (): Promise<string | undefined> => {
  const urlParams = new URLSearchParams(window.location.search);
  const isFromEnrollment = urlParams.get('type') === 'enrollment';
  const emailValue = urlParams.get('email');

  return new Promise((resolve, reject) => {
    api.auth.onAuthStateChange((_, session) => {
      if (emailValue && isFromEnrollment && session) {
        console.log('Успешный вход после подтверждения!');
        resolve(emailValue);
      }

      reject();
    });
  });
};
