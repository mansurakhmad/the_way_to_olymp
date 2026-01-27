<script setup lang="ts">
import { EnrollmentForm } from '@/widgets/EnrollmentForm';
</script>

<template>
  <div class="enrollmentPage">
    <h2>Create Account</h2>
    <EnrollmentForm />
  </div>
</template>

<style lang="scss" scoped>
.enrollmentPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
}
</style>
