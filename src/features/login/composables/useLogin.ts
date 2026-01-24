import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

import { sendLoginRequest } from '../logic/sendLoginRequest';

import type { Login } from '../models';

import { APP_ROUTES } from '@/shared/config';
import { useAlert } from '@/shared/ui';

export const useLogin = () => {
  const router = useRouter();
  const { alertData, triggerAlert } = useAlert();
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: (bodyData: Login.BodyData) => sendLoginRequest(bodyData),
    onSuccess: async () => {
      router.replace(APP_ROUTES.MAIN);
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

  return {
    isPending,
    login: mutate,
    userData: data,
    loginError: error,
    loginAlertData: alertData,
  };
};
