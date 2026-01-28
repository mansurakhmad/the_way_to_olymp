import { readonly } from 'vue';

import { defineStore } from 'pinia';

import { useAlert } from '../composables';

export const useBaseAlertStore = defineStore('alert', () => {
  const { alertData, triggerAlert } = useAlert();

  const closeAlert = () => (alertData.value = null);

  return {
    alertData: readonly(alertData),
    triggerAlert,
    closeAlert,
  };
});
