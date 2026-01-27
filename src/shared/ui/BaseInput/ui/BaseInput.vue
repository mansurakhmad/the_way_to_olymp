<script lang="ts" setup>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

import type { BaseInputTypes } from '../models';

const { labelValue, isValid, errorMessage } = defineProps<BaseInputTypes.Props>();
const emit = defineEmits(['blur']);
const model = defineModel<string>();
</script>

<template>
  <FloatLabel class="baseInput">
    <InputText v-model="model" class="input" @blur="emit('blur')" :invalid="!isValid" />
    <label>{{ labelValue }}</label>
    <template v-if="!isValid && errorMessage">
      <div class="errorMessage">{{ errorMessage }}</div>
    </template>
  </FloatLabel>
</template>

<style lang="scss" scoped>
.baseInput {
  .input {
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
    position: absolute;
    left: 0;
    width: 100%;
    color: var(--red-50);
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    text-align: center;
    padding-top: 12px;
  }
}
</style>
