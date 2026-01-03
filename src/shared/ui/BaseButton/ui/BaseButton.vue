<script setup lang="ts">
import { Button } from 'primevue';
import type { BaseButtonTypes } from '../models';

const { value, theme = 'primary' } = defineProps<BaseButtonTypes.Props>();
</script>

<template>
  <Button class="baseButton" :class="`${theme}Theme`">{{ value }}</Button>
</template>

<style lang="scss" scoped>
.baseButton {
  background-color: var(--glass-white);
  color: var(--white-100);

  &:not(:disabled):hover {
    background: var(--gold-100);
    border: 1px solid var(--gold-100);
    font-weight: 500;
  }

  &:not(:disabled):active {
    background: var(--gold-50);
    border: 1px solid var(--gold-50);
    font-weight: 500;
  }

  &.primaryTheme {
    background-color: var(--glass-white);
    border: 1px solid var(--glass-border);
  }

  &.secondaryTheme {
    background-color: transparent;
    border: none;

    &:not(:disabled):hover {
      background-color: var(--glass-white);
      border: none;
      color: var(--white-100);
    }
  }
}
</style>
