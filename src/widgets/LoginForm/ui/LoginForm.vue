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
import { useRouter, useRoute } from 'vue-router';
import Dialog from 'primevue/dialog';

const router = useRouter();
const route = useRoute();
const email = ref('');
const password = ref('');
const emailIsValid = ref(true);
const rememberMeIsActive = ref(false);
const loading = ref(false);
const { alertData, triggerAlert } = useAlert();

watch(rememberMeIsActive, newValue => {
  localStorage.setItem(KEEP_USER_LOGIN, JSON.stringify(newValue));
});

watch(
  () => route.query.email,
  emailValue => {
    if (emailValue && !Array.isArray(emailValue)) {
      email.value = emailValue;

      triggerAlert({
        title: 'Success!',
        message: 'Password updated successfully.',
        closeTime: 4000,
      });

      router.replace({ query: {} });
    }
  },
  { immediate: true }
);

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
    loading.value = true;

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
  } finally {
    loading.value = false;
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
    <BaseButton value="Forgot Password" theme="secondary" @click="onForgotPasswordClick" />
  </form>
  <BaseAlert v-if="alertData" :isVisible="!!alertData" :themeValue="alertData.theme">
    <template #title>{{ alertData?.title }}</template>
    <template #message>{{ alertData?.message }}</template>
  </BaseAlert>
  <Dialog
    modal
    :closable="false"
    v-model:visible="loading"
    style="background-color: transparent; border: none;"
  >
    <span class="loader"></span>
  </Dialog>
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

.loader {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 48px;
  background: linear-gradient(0deg, var(--gold-10) 33%, var(--red-50) 100%);
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  background: var(--gray-10);
  border-radius: 50%;
  content: '';
  box-sizing: border-box;
  transform: translate(-50%, -50%);
}

@keyframes rotation {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg)}
}

</style>
