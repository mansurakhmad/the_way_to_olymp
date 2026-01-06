import { ref } from 'vue';
import type { BaseAlertTypes } from '../models';

export const useAlert = () => {
  const alertData = ref<BaseAlertTypes.AlertData>();

  const triggerAlert = ({
    title,
    message,
    closeTime,
    theme = 'default',
  }: BaseAlertTypes.TriggerAlertProps) => {
    alertData.value = { title, message, theme };

    if (closeTime) setTimeout(() => (alertData.value = undefined), closeTime);
  };

  return { alertData, triggerAlert };
};
