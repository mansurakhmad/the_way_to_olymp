<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import type { BaseInputTypes } from '../models';

const { labelValue } = defineProps<BaseInputTypes.Props>();
const model = defineModel<string>();
</script>

<template>
  <FloatLabel class="baseInput">
    <InputText v-model="model" class="input" />
    <label>{{ labelValue }}</label>
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
}
</style>
