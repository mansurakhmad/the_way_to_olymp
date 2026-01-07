<script setup lang="ts">
import { sendLoginRequest } from '@/features/login';
import { APP_ROUTES, EMAIL_REGEX, KEEP_USER_LOGIN } from '@/shared/config';
import {
  BaseAlert,
  BaseButton,
  BaseCheckbox,
  BaseInput,
  PasswordField,
  useAlert,
} from '@/shared/ui';
import { testPattern } from '@/shared/utils';
import { AuthError } from '@supabase/supabase-js';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const emailIsValid = ref(true);
const rememberMeIsActive = ref(false);
const { alertData, triggerAlert } = useAlert();

watch(rememberMeIsActive, newValue => {
  localStorage.setItem(KEEP_USER_LOGIN, JSON.stringify(newValue));
});

const isSubmitDisable = computed(() => !email.value || !password.value);

const onEnrollmentClick = () => router.push(APP_ROUTES.ENROLLMENT);

const onForgotPasswordClick = () => router.push(APP_ROUTES.FORGOT_PASSWORD);

const handleEmailInputBlur = () => (emailIsValid.value = true);

const onSubmit = async () => {
  if (!testPattern(email.value, EMAIL_REGEX)) {
    triggerAlert({
      title: 'Invalid Email',
      message: 'Invalid format',
      theme: 'error',
      closeTime: 5000,
    });

    emailIsValid.value = false;

    return;
  }

  try {
    await sendLoginRequest({ email: email.value, password: password.value });

    router.replace(APP_ROUTES.MAIN);
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
      <BaseInput
        labelValue="Email"
        v-model="email"
        :isValid="emailIsValid"
        @blur="handleEmailInputBlur"
      />
      <PasswordField labelValue="Password" v-model="password" :isValid="true" />
      <BaseCheckbox :label="'Remember Me'" inputIdValue="rememberMe" v-model="rememberMeIsActive" />
    </div>
    <BaseButton value="Login" theme="accent" type="submit" :disabled="isSubmitDisable" />
    <BaseButton value="Create Account" theme="secondary" @onClick="onEnrollmentClick" />
    <BaseButton value="Forgot Account" theme="secondary" @click="onForgotPasswordClick" />
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
