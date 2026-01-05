<script setup lang="ts">
import { APP_ROUTERS_NAMES } from '@/shared/config';
import { ContentContainer, HeaderApp } from '@/widgets';
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

const routesWithSmallContainer = [APP_ROUTERS_NAMES.lOGIN, APP_ROUTERS_NAMES.ENROLLMENT];

const sizeValue = computed(() => {
  if (routesWithSmallContainer.includes(route.name as APP_ROUTERS_NAMES)) return 'small';

  return 'normal';
});
</script>

<template>
  <div class="app">
    <ContentContainer class="headerApp" :sizeValue="sizeValue">
      <HeaderApp class="header" />
    </ContentContainer>
    <ContentContainer class="content" :sizeValue="sizeValue">
      <RouterView />
    </ContentContainer>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  height: 100vh;
  background-color: var(--wine-100);
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('../shared/assets/appBg.jpg');

  .headerApp {
    padding: 16px 0 0;
  }

  .content {
    background-color: var(--glass-white);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    margin-top: 40px;
  }
}
</style>
