<script setup lang="ts">
import { RecoveryPasswordForm } from '@/widgets/RecoveryPasswordForm';
</script>

<template>
  <div class="recoveryPasswordPage">
    <h2>Recovery Password</h2>
    <RecoveryPasswordForm />
  </div>
</template>

<style lang="scss" scoped>
.recoveryPasswordPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
}
</style>
