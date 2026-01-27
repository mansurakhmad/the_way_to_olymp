<script setup lang="ts">
import { ForgotPasswordForm } from '@/widgets/ForgotPasswordForm';
</script>

<template>
  <div class="forgotPasswordPage">
    <h2>Forgot Password</h2>
    <ForgotPasswordForm />
  </div>
</template>

<style lang="scss" scoped>
.forgotPasswordPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
}
</style>
