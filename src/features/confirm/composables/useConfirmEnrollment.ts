import { onMounted, type Ref } from 'vue';

import { confirmAfterEnrollment } from '../logic';

import { useAlert } from '@/shared/ui';

export const useConfirmEnrollment = (email: Ref<string>) => {
  const { alertData, triggerAlert } = useAlert();

  onMounted(async () => {
    const emailValue = await confirmAfterEnrollment();

    if (emailValue) {
      email.value = emailValue;

      triggerAlert({
        title: 'Success!',
        message: 'Registration was completed!',
        closeTime: 5000,
      });
    }
  });

  return { confirmAlertData: alertData };
};
