<script setup lang="ts">
import { EnrollmentForm } from '@/widgets';
import banner from '@/shared/assets/enrollment.jpg';
</script>

<template>
  <h2>Create Account</h2>
  <div class="content">
    <EnrollmentForm />
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
  opacity: 0.75;
  object-fit: cover;
}
</style>
