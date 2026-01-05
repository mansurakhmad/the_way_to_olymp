<script lang="ts" setup>
const { sizeValue } = defineProps<{ sizeValue?: 'small' | 'normal' }>();
</script>

<template>
  <div class="contentContainer" :class="`${sizeValue}Size`">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.contentContainer {
  margin: 0 auto;
  padding: 16px;
  width: 100%;

  &.normalSize {
    max-width: 1120px;
  }

  &.smallSize {
    max-width: 900px;
  }
}
</style>
