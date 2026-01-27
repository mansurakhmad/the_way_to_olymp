<script lang="ts" setup>
import { computed } from 'vue';

import { RouterLink, useRoute } from 'vue-router';

import logo from '@/shared/assets/SmallLogo.svg';
import { APP_ROUTES } from '@/shared/config';

const route = useRoute();

const isOnboarding = computed(() => route.meta.isOnboarding);
</script>

<template>
  <header class="header">
    <RouterLink :to="isOnboarding ? APP_ROUTES.lOGIN : APP_ROUTES.MAIN" class="icon">
      <img :src="logo" class="logo" alt="logo" />
      <div>
        <h1 class="title">Nexus</h1>
        <span class="subTitle" v-if="isOnboarding">Ready to work?</span>
        <span class="subTitle" v-else>Performance Hub</span>
      </div>
    </RouterLink>
  </header>
</template>

<style lang="scss" scoped>
.icon {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  padding-left: 64px;
}

.logo {
  position: absolute;
  left: -33px;
  width: 120px;
  height: 120px;
}

.title {
  margin: 0;
  background: linear-gradient(90deg, #fff 0%, #32ebee 25%, #8b1d36 50%, #32ebee 75%, #fff 100%);
  background-size: 200% auto;
  font-size: 24px;
  font-weight: 800;
  line-height: 30px;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  animation: shimmer 4s linear infinite;
}

.subTitle {
  background: linear-gradient(90deg, #fff 0%, #32ebee 25%, #8b1d36 50%, #32ebee 75%, #fff 100%);
  background-size: 200% auto;
  color: var(--white-100);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 4s linear infinite;
}

@keyframes shimmer {
  from {
    background-position: 0% center;
  }

  to {
    background-position: 200% center;
  }
}
</style>
