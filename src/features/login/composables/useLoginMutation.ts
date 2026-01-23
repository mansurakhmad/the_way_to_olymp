import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

import { sendLoginRequest } from '../logic/sendLoginRequest';

import type { Login } from '../models';

import { APP_ROUTES } from '@/shared/config';

export const useLoginMutation = () => {
  const router = useRouter();
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: (bodyData: Login.BodyData) => sendLoginRequest(bodyData),
    onSuccess: async () => {
      router.replace(APP_ROUTES.MAIN);
    },
  });

  return {
    isPending,
    login: mutate,
    userData: data,
    loginError: error,
  };
};
