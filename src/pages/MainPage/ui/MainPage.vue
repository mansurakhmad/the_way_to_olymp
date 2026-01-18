<script setup lang="ts">
import { BaseButton, WidgetSkeleton } from '@/shared/ui';
</script>

<template>
  <div class="mainPage">
    <WidgetSkeleton theme="Blue">
      <template #title>Fitness Lab</template>
      <template #content>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </template>
      <template #footer>
        <BaseButton value="Open" theme="secondary" />
      </template>
    </WidgetSkeleton>

    <WidgetSkeleton theme="Gold">
      <template #title>FinTech App</template>
    </WidgetSkeleton>

    <WidgetSkeleton theme="Red">
      <template #title>Task Manager</template>
    </WidgetSkeleton>
  </div>
</template>

<style lang="scss" scoped>
.mainPage {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  height: calc(100vh - 150px);
}
</style>
