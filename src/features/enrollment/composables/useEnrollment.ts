import type { Ref } from 'vue';

import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

import { sendEnrollmentRequest } from '../logic';

import type { Enrollment } from '../models';

import { APP_ROUTERS_NAMES, APP_ROUTES } from '@/shared/config';
import { useBaseAlertStore } from '@/shared/ui';

export const useEnrollment = (
  emailRef: Ref<string>,
  passwordRef: Ref<string>,
  confirmPasswordRef: Ref<string>
) => {
  const router = useRouter();
  const { triggerAlert, closeAlert } = useBaseAlertStore();

  const clearFormFields = () => {
    emailRef.value = '';
    passwordRef.value = '';
    confirmPasswordRef.value = '';
  };

  const { mutate, isPending, data, error, isSuccess } = useMutation({
    meta: { showLoader: true },
    mutationFn: (bodyData: Enrollment.BodyData) => sendEnrollmentRequest(bodyData),
    onSuccess: data => {
      triggerAlert({
        title: 'Registration was successful!',
        message: `Check your email: ${data.user?.user_metadata?.email}`,
        theme: 'default',
        closeTime: 3000,
        onClose: () => {
          router.push({
            path: APP_ROUTES.lOGIN,
            query: {
              email: `${data.user?.user_metadata?.email}`,
              from: APP_ROUTERS_NAMES.ENROLLMENT,
            },
          });
        },
      });

      clearFormFields();
    },
    onError: error => {
      triggerAlert({
        title: error.name || 'Something went wrong',
        message: error.message || 'Check logs',
        theme: 'error',
        closeTime: 5000,
      });

      clearFormFields();
    },
  });

  return {
    isPending,
    isSuccess,
    closeAlert,
    enroll: mutate,
    enrollmentData: data,
    enrollmentError: error,
  };
};
