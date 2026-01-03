<script lang="ts" setup>
import { Dialog } from 'primevue';
import type { BaseAlertTypes } from '../models';

const props = defineProps<BaseAlertTypes.Props>();
const { isVisible, message, title, themeValue = 'default' } = props;
console.log('props', props);
</script>

<template>
  <Dialog
    class="baseDialog"
    :class="`${themeValue}Theme`"
    position="bottom"
    :visible="isVisible"
    :draggable="false"
    :closable="false"
  >
    <h4 class="title">{{ title }}</h4>
    <p class="message">{{ message }}</p>
  </Dialog>
</template>

<style lang="scss" scoped>
.baseDialog {
  &.errorTheme {
    background-color: var(--wine-50);
    color: var(--white-100);

    :deep(.p-dialog-content) {
      background-color: var(--wine-50);
    }
  }
}
</style>
