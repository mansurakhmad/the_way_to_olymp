<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import Dialog from 'primevue/dialog';
import { useRouter, useRoute } from 'vue-router';

import { useConfirmEnrollment } from '@/features/confirm';
import { useLogin } from '@/features/login';
import { APP_ROUTERS_NAMES, APP_ROUTES, EMAIL_REGEX, KEEP_USER_LOGIN } from '@/shared/config';
import { BaseButton, BaseCheckbox, BaseInput, PasswordField, useBaseAlertStore } from '@/shared/ui';
import { testPattern } from '@/shared/utils';

const router = useRouter();
const route = useRoute();
const email = ref('');
const password = ref('');
const emailIsValid = ref(true);
const rememberMeIsActive = ref(false);
const { triggerAlert, closeAlert } = useBaseAlertStore();
const { login, isPending } = useLogin();

useConfirmEnrollment(email);

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
      router.replace({ query: {} });
    }
  },
  { immediate: true }
);

const isSubmitDisable = computed(() => !email.value || !password.value);

const onSubmit = () => {
  closeAlert();

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
  <Transition name="slide-up" appear>
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
  </Transition>
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
    margin-bottom: 12px;
  }
}

.slide-up-enter-active {
  transition: all 0.85s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(50%);
}
</style>
