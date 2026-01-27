<script setup lang="ts">
import { FloatLabel, Password } from 'primevue';

import type { PasswordFieldTypes } from '../models';

const modelValue = defineModel<string>();
const { labelValue, isValid, errorMessage } = defineProps<PasswordFieldTypes.Props>();
</script>

<template>
  <FloatLabel class="passwordField">
    <Password
      v-model="modelValue"
      :feedback="false"
      :invalid="!isValid"
      class="inputWrapper"
      toggleMask
    />
    <label>{{ labelValue }}</label>
    <template v-if="!isValid && errorMessage">
      <div class="errorMessage">{{ errorMessage }}</div>
    </template>
  </FloatLabel>
</template>

<style lang="scss" scoped>
.passwordField {
  width: 100%;

  :deep(.inputWrapper) {
    width: 100%;
  }

  :deep(input) {
    width: 100%;
    background-color: var(--glass-white);

    &:focus {
      border: 1px solid var(--gold-10);
    }
  }

  &:has(input:focus) {
    label {
      color: var(--gold-50);
    }
  }

  &:has(input[aria-invalid='true']) {
    label {
      color: var(--red-50);
      font-weight: 500;
    }
  }

  .errorMessage {
    color: var(--red-50);
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    padding-top: 12px;
  }
}
</style>
