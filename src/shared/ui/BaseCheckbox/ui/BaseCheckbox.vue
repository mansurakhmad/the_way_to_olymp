<script setup lang="ts">
import type { BaseCheckboxTypes } from '../models';
import { Checkbox } from 'primevue';

const { label, inputIdValue } = defineProps<BaseCheckboxTypes.Props>();
</script>

<template>
  <div class="baseCheckbox">
    <Checkbox binary :inputId="inputIdValue" :name="inputIdValue" />
    <label :for="inputIdValue" class="label">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.baseCheckbox {
  display: flex;
  align-items: center;
  gap: 12px;

  :deep(.p-checkbox-box) {
    background-color: var(--glass-white) !important;
    border: 1px solid var(--glass-white) !important;

    svg {
      color: var(--gold-100) !important;
    }
  }

  .label {
    color: var(--white-100);
    cursor: pointer;
  }
}
</style>
