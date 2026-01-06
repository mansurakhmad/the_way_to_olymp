<script setup lang="ts">
import { LoginForm } from '@/widgets';
import banner from '@/shared/assets/login.jpg';
</script>

<template>
  <div>
    <p class="title">Log in to your account</p>
    <div class="content">
      <LoginForm />
      <img :src="banner" class="banner" alt="banner" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
}

.title {
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
  margin-bottom: 24px;
}

.banner {
  width: 400px;
  border-radius: 16px;
  opacity: 0.75;
  object-fit: cover;
}
</style>
