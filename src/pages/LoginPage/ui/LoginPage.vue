<script setup lang="ts">
import { LoginForm } from '@/widgets';
import banner from '@/shared/assets/loginBanner.png';
</script>

<template>
  <div>
    <p class="title">Login</p>
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
  align-items: center;
}

.title {
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
  margin-bottom: 24px;
}

.banner {
  width: 400px;
  transform: scale(1.35);
}
</style>
