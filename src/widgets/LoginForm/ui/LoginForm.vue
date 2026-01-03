<script setup lang="ts">
import { BaseButton, BaseCheckbox, BaseInput } from '@/shared/ui';
import { ref } from 'vue';

const username = ref();
const email = ref();
const rememberMe = 'rememberMe';
</script>

<template>
  <form class="loginForm">
    <div class="fields">
      <BaseInput labelValue="Username" v-model="username" />
      <BaseInput labelValue="Email" v-model="email" />
      <BaseCheckbox :label="'Remember Me'" :inputIdValue="rememberMe" />
    </div>
    <BaseButton value="Login" class="loginButton" />
    <BaseButton value="Create Account" class="loginButton" theme="secondary" />
    <BaseButton value="Forgot Account" class="loginButton" theme="secondary" />
  </form>
</template>

<style lang="scss" scoped>
.loginForm {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 12px;
  width: 100%;
  max-width: 400px;
  background-color: var(--glass-white);
  border-radius: 12px;
  color: var(--black-100);
  box-shadow: var(--shadow-overlay) 0 20px 30px -10px;

  .fields {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .loginButton {
    box-shadow: var(--shadow-overlay) 0 20px 30px -10px;
  }
}
</style>
