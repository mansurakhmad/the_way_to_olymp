import { api } from '@/shared/api';

export const confirmAfterEnrollment = () => {
  return new Promise((resolve, reject) => {
    api.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        console.log('Успешный вход после подтверждения!');
        resolve(true);
      }

      reject(false);
    });
  });
};
