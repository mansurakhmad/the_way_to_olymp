<script setup lang="ts">
import { ForgotPasswordForm } from '@/widgets';
import banner from '@/shared/assets/forgotpasswordBanner.jpg';
</script>

<template>
  <h2>Forgot Password</h2>
  <div class="content">
    <ForgotPasswordForm />
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
  opacity: 0.5;
  object-fit: cover;
}
</style>
