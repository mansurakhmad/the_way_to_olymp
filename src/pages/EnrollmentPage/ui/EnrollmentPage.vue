<script setup lang="ts">
import { EnrollmentForm } from '@/widgets/EnrollmentForm';
</script>

<template>
  <div class="enrollmentPage">
    <Transition name="slide-down" appear>
      <h2>Create Account</h2>
    </Transition>
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

.slide-down-enter-from {
  transform: translateY(-200%);
  opacity: 0;
}

.slide-down-enter-active {
  transition: all 0.5s ease-in-out;
}
</style>
