<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { Dialog } from 'primevue';

import { useBaseAlertStore } from '../store';

const alertStore = useBaseAlertStore();

const { alertData } = storeToRefs(alertStore);
</script>

<template>
  <Dialog
    class="baseDialog"
    position="bottom"
    :class="`${alertData?.theme}Theme`"
    :visible="!!alertData"
    :draggable="false"
    :closable="false"
    :pt="{ header: { style: 'padding: 16px 0 0' } }"
  >
    <div class="content">
      <h4 class="title">
        <slot name="title">{{ alertData?.title }}</slot>
      </h4>
      <p class="message">
        <slot name="message">{{ alertData?.message }}</slot>
      </p>
    </div>
  </Dialog>
</template>

<style lang="scss">
.baseDialog.p-dialog {
  border: none;
  color: var(--white-100);

  &.defaultTheme {
    background-color: var(--wine-150);
  }

  &.errorTheme {
    background-color: var(--wine-100);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .title {
      font-size: 28px;
      line-height: 32px;
    }
  }
}
</style>
