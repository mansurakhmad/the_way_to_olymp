import { defineStore } from 'pinia';

import { useAlert } from '../composables';

export const useBaseAlertStore = defineStore('alert', () => {
  const { alertData, closeAlert, triggerAlert } = useAlert();

  return {
    alertData,
    closeAlert,
    triggerAlert,
  };
});
