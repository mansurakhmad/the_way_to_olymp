<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { ContentContainer } from '@/widgets/ContentContainer';
import { HeaderApp } from '@/widgets/HeaderApp';

const route = useRoute();

const isOnboardingRoute = computed(() => route.meta.isOnboarding);
</script>

<template>
  <div class="app" :class="isOnboardingRoute ? 'onboarding' : 'authorized'">
    <ContentContainer class="headerApp" :sizeValue="isOnboardingRoute ? 'small' : 'normal'">
      <HeaderApp class="header" />
    </ContentContainer>
    <ContentContainer class="content" :sizeValue="isOnboardingRoute ? 'small' : 'normal'">
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

  &.authorized {
    background-image: url('../shared/assets/authorizedBg.jpg');
  }

  &.onboarding {
    background-image: url('../shared/assets/onboardingBg.jpg');
  }

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
