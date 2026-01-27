<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import Dialog from 'primevue/dialog';
import { useRouter, useRoute } from 'vue-router';

import { useLogin } from '@/features/login';
import { APP_ROUTERS_NAMES, APP_ROUTES, EMAIL_REGEX, KEEP_USER_LOGIN } from '@/shared/config';
import {
  BaseAlert,
  BaseButton,
  BaseCheckbox,
  BaseInput,
  PasswordField,
  useAlert,
} from '@/shared/ui';
import { testPattern } from '@/shared/utils';

const router = useRouter();
const route = useRoute();
const email = ref('');
const password = ref('');
const emailIsValid = ref(true);
const rememberMeIsActive = ref(false);
const { login, isPending, loginAlertData } = useLogin();
const { alertData, triggerAlert } = useAlert();
const alertDataToShow = computed(() => alertData.value || loginAlertData.value);

watch(rememberMeIsActive, newValue => {
  localStorage.setItem(KEEP_USER_LOGIN, JSON.stringify(newValue));
});

watch(
  () => route.query,
  routeData => {
    if (routeData.email && !Array.isArray(routeData.email)) {
      email.value = routeData.email;

      if (routeData.from === APP_ROUTERS_NAMES.RECOVERY_PASSWORD) {
        triggerAlert({
          title: 'Success!',
          message: 'Password updated successfully.',
          closeTime: 5000,
        });
      }

      if (routeData.from === APP_ROUTERS_NAMES.CONFIRM) {
        triggerAlert({
          title: 'Success enrollment!',
          message: 'New account confirmed successfully.',
          closeTime: 5000,
        });
      }

      router.replace({ query: {} });
    }
  },
  { immediate: true }
);

const isSubmitDisable = computed(() => !email.value || !password.value);

const onSubmit = () => {
  alertData.value = null;
  loginAlertData.value = null;

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

  login({ email: email.value, password: password.value });
};
</script>

<template>
  <form class="loginForm" @submit.prevent="onSubmit">
    <div class="fields">
      <BaseInput
        labelValue="Email"
        v-model="email"
        :isValid="emailIsValid"
        @blur="emailIsValid = true"
      />
      <PasswordField labelValue="Password" v-model="password" :isValid="true" />
    </div>
    <BaseCheckbox :label="'Remember Me'" inputIdValue="rememberMe" v-model="rememberMeIsActive" />
    <BaseButton value="Login" theme="accent" type="submit" :disabled="isSubmitDisable" />
    <BaseButton
      value="Create Account"
      theme="secondary"
      @onClick="$router.push(APP_ROUTES.ENROLLMENT)"
    />
    <BaseButton
      value="Forgot Password"
      theme="secondary"
      @click="$router.push(APP_ROUTES.FORGOT_PASSWORD)"
    />
  </form>
  <BaseAlert
    v-if="alertDataToShow"
    :isVisible="!!alertDataToShow"
    :themeValue="alertDataToShow?.theme"
  >
    <template #title>{{ alertDataToShow.title }}</template>
    <template #message>{{ alertDataToShow.message }}</template>
  </BaseAlert>
  <Dialog
    modal
    :closable="false"
    v-model:visible="isPending"
    style="background-color: transparent; border: none"
  >
    <span class="loader"></span>
  </Dialog>
</template>

<style lang="scss" scoped>
.loginForm {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  color: var(--black-100);

  .fields {
    display: flex;
    flex-direction: column;
    gap: 44px;
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
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
