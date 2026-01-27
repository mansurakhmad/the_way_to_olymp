<script setup lang="ts">
import { LoginForm } from '@/widgets/LoginForm';
</script>

<template>
  <div class="loginPage">
    <Transition name="slide-down" appear>
      <h2 class="title">Log in to your account</h2>
    </Transition>
    <div class="content">
      <LoginForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loginPage {
  display: flex;
  flex-direction: column;
  gap: 44px;
}

.content {
  display: flex;
  justify-content: space-between;
}

.title {
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
}

.banner {
  width: 400px;
  border-radius: 16px;
  opacity: 0.75;
  object-fit: cover;
}

.slide-down-enter-from {
  transform: translateY(-200%);
  opacity: 0;
}

.slide-down-enter-active {
  transition: all 0.5s ease-in-out;
}
</style>
