<script setup lang="ts">
import { APP_ROUTES } from '@/shared/config';
import { BaseButton, BaseCheckbox, BaseInput, PasswordField } from '@/shared/ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');

const onEnrollmentClick = () => {
  router.push(APP_ROUTES.ENROLLMENT);
};
</script>

<template>
  <form class="loginForm">
    <div class="fields">
      <BaseInput labelValue="Email" v-model="email" />
      <PasswordField labelValue="Password" v-model="password" :isValid="true" />
      <BaseCheckbox :label="'Remember Me'" inputIdValue="rememberMe" />
    </div>
    <BaseButton value="Login" theme="accent" />
    <BaseButton value="Create Account" theme="secondary" @onClick="onEnrollmentClick" />
    <BaseButton value="Forgot Account" theme="secondary" />
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
}
</style>
