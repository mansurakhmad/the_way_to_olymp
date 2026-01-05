<script setup lang="ts">
import { FloatLabel, Password } from 'primevue';
import type { PasswordFieldTypes } from '../models';

const modelValue = defineModel<string>();
const { labelValue, isValid } = defineProps<PasswordFieldTypes.Props>();
console.log('isValid', isValid);
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
}
</style>
