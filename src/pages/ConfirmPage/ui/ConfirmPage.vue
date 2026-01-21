<script lang="ts" setup>
import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { confirmAfterEnrollment } from '@/features/enrollment';
import { APP_ROUTES } from '@/shared/config';

const router = useRouter();

onMounted(async () => {
  const isConfirmed = await confirmAfterEnrollment();

  if (isConfirmed) {
    router.push(APP_ROUTES.MAIN);
    return;
  }

  router.push(APP_ROUTES.lOGIN);
});
</script>

<template>
  <div class="confirmPage">
    <h2>Confirmation email...</h2>
    <span class="loader"></span>
  </div>
</template>

<style lang="scss" scoped>
.confirmPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 54px;
  padding-bottom: 24px;
}

.loader {
  position: relative;
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 5px solid;
  border-radius: 50%;
  border-color: var(--gold-50) var(--gold-50) transparent transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader::after,
.loader::before {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  border: 5px solid;
  border-radius: 50%;
  content: '';
  border-color: transparent transparent var(--red-100) var(--red-100);
  box-sizing: border-box;
  animation: rotation-back 0.5s linear infinite;
  transform-origin: center center;
}

.loader::before {
  width: 80px;
  height: 80px;
  border-color: var(--wine-100) var(--wine-100) transparent transparent;
  animation: rotation 1.5s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotation-back {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
