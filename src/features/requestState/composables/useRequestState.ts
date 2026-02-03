import { onUnmounted, ref } from 'vue';

import { useQueryClient } from '@tanstack/vue-query';

export const useRequestState = () => {
  const showLoader = ref(false);

  const queryClient = useQueryClient();

  const unsubscribeMutations = queryClient.getMutationCache().subscribe(e => {
    if (!('action' in e)) return;

    if (e.mutation?.options.meta?.showLoader && e.action.type === 'pending') {
      showLoader.value = true;

      return;
    }

    showLoader.value = false;
  });

  onUnmounted(() => unsubscribeMutations());

  return { showLoader };
};
