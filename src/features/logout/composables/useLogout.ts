import { useMutation } from '@tanstack/vue-query';

import { logoutUser } from '../logic/logoutUser';

import { APP_ROUTES, KEEP_USER_LOGIN } from '@/shared/config';
import { useBaseAlertStore } from '@/shared/ui';

export const useLogout = () => {
  const { triggerAlert } = useBaseAlertStore();
  const { mutate } = useMutation({
    meta: { showLoader: true },
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem(KEEP_USER_LOGIN);
      window.location.href = APP_ROUTES.lOGIN;
    },
    onError: error => {
      triggerAlert({
        title: error.name,
        message: error.message,
        theme: 'error',
        closeTime: 5000,
      });
    },
  });

  return { logout: mutate };
};
