import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

import { sendRecoveryPasswordRequest } from '../logic';

import { APP_ROUTERS_NAMES, APP_ROUTES } from '@/shared/config';
import { useAlert } from '@/shared/ui';

export const useRecoveryPassword = () => {
  const router = useRouter();
  const { alertData, triggerAlert } = useAlert();

  const { mutate } = useMutation({
    mutationFn: (password: string) => sendRecoveryPasswordRequest(password),
    onSuccess: response => {
      router.replace({
        path: APP_ROUTES.lOGIN,
        query: {
          email: `${response.user.email}`,
          from: APP_ROUTERS_NAMES.RECOVERY_PASSWORD,
        },
      });
    },
    onError: error => {
      triggerAlert({
        title: error.name,
        message: error.message,
        closeTime: 4000,
        theme: 'error',
        onClose: () => {
          if (error.name === 'AuthSessionMissingError') router.replace(APP_ROUTES.lOGIN);
        },
      });
    },
  });

  return {
    alertData,
    recoveryPassword: mutate,
  };
};
