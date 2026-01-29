import { readonly, ref } from 'vue';

import type { BaseAlertTypes } from '../models';

export const useAlert = () => {
  const alertData = ref<BaseAlertTypes.AlertData | null>(null);

  const triggerAlert = ({
    title,
    message,
    closeTime,
    theme = 'default',
    onClose = () => {},
  }: BaseAlertTypes.TriggerAlertProps) => {
    alertData.value = { title, message, theme };

    if (closeTime)
      setTimeout(() => {
        alertData.value = null;
        onClose();
      }, closeTime);
  };

  const closeAlert = () => (alertData.value = null);

  return { alertData: readonly(alertData), triggerAlert, closeAlert };
};
