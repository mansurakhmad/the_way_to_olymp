<script setup lang="ts">
import { computed } from 'vue';

import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { RouterView, useRoute } from 'vue-router';

import planet from '@/shared/assets/plannet.svg';
import { ContentContainer } from '@/widgets/ContentContainer';
import { HeaderApp } from '@/widgets/HeaderApp';

const route = useRoute();

const isOnboardingRoute = computed(() => route.meta.isOnboarding);
</script>

<template>
  <div class="app" :class="isOnboardingRoute ? 'onboarding' : 'authorized'">
    <img :src="planet" alt="planner" class="planet" />
    <ContentContainer class="headerApp" :sizeValue="isOnboardingRoute ? 'small' : 'normal'">
      <HeaderApp class="header" />
    </ContentContainer>
    <ContentContainer
      class="content"
      :class="isOnboardingRoute ? 'onboarding' : ''"
      :sizeValue="isOnboardingRoute ? 'small' : 'normal'"
    >
      <RouterView />
    </ContentContainer>
  </div>
  <VueQueryDevtools />
</template>

<style scoped lang="scss">
.app {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  height: 100vh;
  background-color: var(--black-150);
  background-image: url('../shared/assets/outer-space-background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
  overflow: hidden;

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 0;
    text-align: center;
    margin-top: 40px;

    &.onboarding > *:first-child {
      width: 375px;
    }
  }

  .headerApp {
    padding: 16px 0 0;
  }
}

.planet {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  animation: rotate-planet 60s linear infinite;
}

@keyframes rotate-planet {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
