import type { Ref } from 'vue';

import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

import { sendForgotPasswordRequest } from '../logic';

import { APP_ROUTES } from '@/shared/config';
import { useAlert } from '@/shared/ui';

export const useForgotPassword = (emailRef: Ref<string>) => {
  const router = useRouter();
  const { alertData, triggerAlert } = useAlert();
  const { mutate, isPending } = useMutation({
    mutationFn: () => sendForgotPasswordRequest(emailRef.value),
    onSuccess: () => {
      triggerAlert({
        title: `Check ${emailRef.value} address`,
        message: `If you don't see the email within a few minutes, please check your spam folder.`,
        closeTime: 5000,
        onClose: () => router.replace(APP_ROUTES.lOGIN),
      });

      emailRef.value = '';
    },
    onError: error => {
      triggerAlert({
        title: error.name,
        message: error.message,
        closeTime: 4000,
        theme: 'error',
      });

      emailRef.value = '';
    },
  });

  return {
    mutate,
    isPending,
    alertData,
  };
};
