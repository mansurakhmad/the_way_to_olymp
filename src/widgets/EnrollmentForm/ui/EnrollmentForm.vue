<script lang="ts" setup>
import { sendEnrollmentRequest } from '@/features/enrollment';
import { BaseAlert, type BaseAlertTypes, BaseButton, BaseInput, PasswordField } from '@/shared/ui';
import { testPattern } from '@/shared/utils';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../config';
import type { EnrollmentFormTypes } from '../models';

const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const alertData = ref<BaseAlertTypes.AlertData>();

const passwordValuesAreEqual = computed(() => {
  if (!confirmPassword.value) return true;

  return password.value === confirmPassword.value;
});

const submitButtonDisabled = computed(() => {
  return !email.value || !password.value || !confirmPassword.value;
});

console.log('submitButtonDisabled', submitButtonDisabled);

watch(passwordValuesAreEqual, () => {
  if (!passwordValuesAreEqual.value) {
    triggerAlert({
      theme: 'error',
      title: 'Validation error!',
      message: 'Passwords mismatch. Requirements: A-Z, 0-9, and !#%$',
    });
  } else {
    alertData.value = undefined;
  }
});

const onBackClick = () => router.back();

const triggerAlert = ({
  title,
  message,
  closeTime,
  theme = 'default',
}: EnrollmentFormTypes.TriggerAlertProps) => {
  alertData.value = { title, message, theme };

  if (closeTime) setTimeout(() => (alertData.value = undefined), closeTime);
};

const submitValidation = () => {
  if (!email.value || !password.value || !confirmPassword.value) return false;

  if (!passwordValuesAreEqual.value) return false;

  if (!testPattern(password.value, PASSWORD_REGEX)) {
    triggerAlert({
      title: 'An error occurred while submitting',
      message: `Invalid password. Requirements: A-Z, 0-9, and !#%$`,
      theme: 'error',
      closeTime: 5000,
    });

    return false;
  }

  if (!testPattern(email.value, EMAIL_REGEX)) {
    triggerAlert({
      title: 'An error occurred while submitting',
      message: `Invalid email`,
      theme: 'error',
      closeTime: 2000,
    });

    return false;
  }

  return true;
};

const submitForm = async () => {
  if (!submitValidation()) return;

  try {
    await sendEnrollmentRequest({ email: email.value, password: password.value });

    triggerAlert({
      title: 'Registration was successful!',
      message: `Check your email: ${email.value}`,
      theme: 'default',
      closeTime: 5000,
    });

    email.value = '';
    password.value = '';
    confirmPassword.value = '';
  } catch (error) {
    console.log('error', error);

    triggerAlert({
      title: 'Registration error',
      message: `Check logs`,
      theme: 'error',
      closeTime: 5000,
    });
  }
};
</script>

<template>
  <form class="enrollmentForm" @submit.prevent="submitForm">
    <BaseInput labelValue="Email" v-model="email" />
    <PasswordField labelValue="Password" v-model="password" :isValid="passwordValuesAreEqual" />
    <PasswordField
      labelValue="Confirm password"
      v-model="confirmPassword"
      :isValid="passwordValuesAreEqual"
    />
    <BaseButton
      value="Create Account"
      class="button"
      type="submit"
      :disabled="submitButtonDisabled"
    />
    <BaseButton value="Back" class="button" theme="secondary" @onClick="onBackClick" />
  </form>
  <BaseAlert v-if="alertData" :isVisible="!!alertData" :themeValue="alertData.theme">
    <template v-slot:title>{{ alertData?.title }}</template>
    <template v-slot:message>{{ alertData?.message }}</template>
  </BaseAlert>
</template>

<style lang="scss" scoped>
.enrollmentForm {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 12px;
  width: 100%;
  max-width: 400px;
  background-color: var(--glass-white);
  border-radius: 12px;
  color: var(--black-100);
  box-shadow: var(--shadow-overlay) 0 20px 30px -10px;
}
</style>
