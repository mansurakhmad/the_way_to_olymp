import { useMutation } from '@tanstack/vue-query';

import { sendEnrollmentRequest } from '../logic';

import type { Enrollment } from '../models';

import { useAlert } from '@/shared/ui';

export const useEnrollment = () => {
  const { alertData, triggerAlert } = useAlert();
  const { mutate, isPending, data, error, isSuccess } = useMutation({
    mutationFn: (bodyData: Enrollment.BodyData) => sendEnrollmentRequest(bodyData),
    onSuccess: data => {
      triggerAlert({
        title: 'Registration was successful!',
        message: `Check your email: ${data.user?.user_metadata?.email}`,
        theme: 'default',
        closeTime: 5000,
      });
    },
    onError: error => {
      triggerAlert({
        title: error.name || 'Something went wrong',
        message: error.message || 'Check logs',
        theme: 'error',
        closeTime: 5000,
      });
    },
  });

  return {
    isPending,
    isSuccess,
    alertData,
    enroll: mutate,
    enrollmentData: data,
    enrollmentError: error,
  };
};
