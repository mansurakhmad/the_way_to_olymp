<script setup lang="ts">
import { api } from '@/shared/api';
import { APP_ROUTERS_NAMES, APP_ROUTES, KEEP_USER_LOGIN } from '@/shared/config';
import { ContentContainer, HeaderApp } from '@/widgets';
import { computed, onMounted } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

const routesWithSmallContainer = [
  APP_ROUTERS_NAMES.lOGIN,
  APP_ROUTERS_NAMES.ENROLLMENT,
  APP_ROUTERS_NAMES.FORGOT_PASSWORD,
  APP_ROUTERS_NAMES.CONFIRM,
];

const sizeValue = computed(() => {
  if (routesWithSmallContainer.includes(route.name as APP_ROUTERS_NAMES)) return 'small';

  return 'normal';
});

onMounted(() => {
  api.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session) || !session) {
      router.replace(APP_ROUTES.lOGIN);

      localStorage.removeItem(KEEP_USER_LOGIN);
    }
  });
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
