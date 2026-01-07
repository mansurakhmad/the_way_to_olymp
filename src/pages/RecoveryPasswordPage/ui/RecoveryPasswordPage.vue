<script setup lang="ts">
import { RecoveryPasswordForm } from '@/widgets';
import banner from '@/shared/assets/recoveryPasswordBanner.png';
</script>

<template>
  <h2>Recovery Password</h2>
  <div class="content">
    <RecoveryPasswordForm />
    <img :src="banner" alt="banner" class="banner" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}

.banner {
  width: 400px;
  border-radius: 16px;
  opacity: 0.7;
  object-fit: cover;
}
</style>
