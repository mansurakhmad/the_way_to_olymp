<script setup lang="ts">
import { sendForgotPasswordRequest } from '@/features/forgotPassword';
import { APP_ROUTES, EMAIL_REGEX } from '@/shared/config';
import { BaseButton, BaseInput, useAlert, BaseAlert } from '@/shared/ui';
import { testPattern } from '@/shared/utils';
import { AuthError } from '@supabase/supabase-js';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref();
const router = useRouter();
const { alertData, triggerAlert } = useAlert();
const emailIsValid = computed(() => {
  if (!email.value) return true;

  return testPattern(email.value, EMAIL_REGEX);
});

const submitIsDisable = computed(() => !email.value || !emailIsValid.value);

const submit = async () => {
  try {
    await sendForgotPasswordRequest(email.value);
    triggerAlert({
      title: `Check ${email.value} address`,
      message: `If you don't see the email within a few minutes, please check your spam folder.`,
      closeTime: 5000,
      onClose: () => router.replace(APP_ROUTES.lOGIN),
    });
    email.value = '';
  } catch (error) {
    email.value = '';
    if (error instanceof AuthError) {
      triggerAlert({
        title: error.name,
        message: error.message,
        closeTime: 2000,
        theme: 'error',
      });

      return;
    }

    triggerAlert({
      title: 'Something went wrong',
      message: 'Check logs',
      closeTime: 2000,
      theme: 'error',
    });
  }
};
</script>

<template>
  <form class="forgotPasswordForm" @submit.prevent="submit">
    <BaseInput
      labelValue="Email"
      v-model="email"
      :isValid="emailIsValid"
      errorMessage="Invalid format"
    />
    <div class="buttons">
      <BaseButton value="Submit" theme="accent" type="submit" :disabled="submitIsDisable" />
      <BaseButton value="Back" theme="secondary" @click="router.back()" />
    </div>
  </form>
  <BaseAlert v-if="alertData" :isVisible="!!alertData" :themeValue="alertData.theme">
    <template #title>{{ alertData?.title }}</template>
    <template #message>{{ alertData?.message }}</template>
  </BaseAlert>
</template>

<style lang="scss" scoped>
.forgotPasswordForm {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  padding: 32px 12px;
  width: 100%;
  max-width: 400px;
  background-color: var(--glass-white);
  border-radius: 12px;
  color: var(--black-100);
  box-shadow: var(--shadow-overlay) 0 20px 30px -10px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
