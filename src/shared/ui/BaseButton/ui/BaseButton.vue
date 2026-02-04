<script setup lang="ts">
import { Button } from 'primevue';

import type { BaseButtonTypes } from '../models';

const {
  value,
  theme = 'primary',
  type = 'button',
  disabled,
} = defineProps<BaseButtonTypes.Props>();
</script>

<template>
  <Button class="baseButton" :class="`${theme}Theme`" @click="$emit('onClick')" :disabled :type>
    {{ value }}
  </Button>
</template>

<style lang="scss" scoped>
.baseButton {
  background-color: var(--glass-white);
  color: var(--white-100);
  box-shadow: var(--shadow-overlay) 0 20px 30px -10px;

  &:not(:disabled):hover {
    background: var(--gold-100);
    border: 1px solid var(--gold-100);
    color: var(--white-100);
  }

  &:not(:disabled):active {
    background: var(--gold-50);
    border: 1px solid var(--gold-50);
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

  &.accentTheme {
    background: var(--gold-100);
    border: 1px solid var(--gold-100);

    &:not(:disabled):hover {
      background: var(--gold-50);
      border: 1px solid var(--gold-50);
      color: var(--white-100);
    }

    &:not(:disabled):active {
      background: var(--gold-10);
      border: 1px solid var(--gold-10);
      color: var(--white-100);
    }
  }

  &.outlineTheme {
    background: transparent;
    border: 1px solid var(--white-100);

    &:not(:disabled):hover,
    &:not(:disabled):active {
      background-color: var(--glass-white);
      border: 1px solid var(--white-100);
      color: var(--white-100);
    }
  }

  &.outlineCyanTheme {
    background: transparent;
    border: 1px solid var(--cyan-50-o-80);
    color: var(--cyan-50);

    &:not(:disabled):hover,
    &:not(:disabled):active {
      background-color: var(--glass-white);
      border: 1px solid var(--cyan-10);
      color: var(--cyan-10);
    }
  }
}
</style>
