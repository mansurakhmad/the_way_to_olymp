<script setup lang="ts">
import { sendLoginRequest } from '@/features/login';
import { APP_ROUTES } from '@/shared/config';
import {
  BaseAlert,
  BaseButton,
  BaseCheckbox,
  BaseInput,
  PasswordField,
  useAlert,
} from '@/shared/ui';
import { AuthError } from '@supabase/supabase-js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const { alertData, triggerAlert } = useAlert();

const onEnrollmentClick = () => {
  router.push(APP_ROUTES.ENROLLMENT);
};

const onSubmit = async () => {
  try {
    const response = await sendLoginRequest({ email: email.value, password: password.value });
    console.log('response', response);
  } catch (error) {
    if (error instanceof AuthError) {
      triggerAlert({
        title: error.name,
        message: error.message,
        theme: 'error',
        closeTime: 5000,
      });
    } else {
      triggerAlert({
        title: 'Something went wrong',
        message: 'Check logs',
        theme: 'error',
        closeTime: 5000,
      });
    }
  }
};
</script>

<template>
  <form class="loginForm" @submit.prevent="onSubmit">
    <div class="fields">
      <BaseInput labelValue="Email" v-model="email" />
      <PasswordField labelValue="Password" v-model="password" :isValid="true" />
      <BaseCheckbox :label="'Remember Me'" inputIdValue="rememberMe" />
    </div>
    <BaseButton value="Login" theme="accent" type="submit" />
    <BaseButton value="Create Account" theme="secondary" @onClick="onEnrollmentClick" />
    <BaseButton value="Forgot Account" theme="secondary" />
  </form>
  <BaseAlert v-if="alertData" :isVisible="!!alertData" :themeValue="alertData.theme">
    <template v-slot:title>{{ alertData?.title }}</template>
    <template v-slot:message>{{ alertData?.message }}</template>
  </BaseAlert>
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
