<script lang="ts" setup>
import { sendEnrollmentRequest } from '@/features/enrollment';
import { BaseAlert, type BaseAlertTypes, BaseButton, BaseInput, PasswordField } from '@/shared/ui';
import { testPattern } from '@/shared/utils';
import { computed, ref } from 'vue';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../config';
import type { EnrollmentFormTypes } from '../models';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const alertData = ref<BaseAlertTypes.AlertData>();

const passwordValuesAreValid = computed(() => {
  if (!confirmPassword.value) return true;

  if (password.value === confirmPassword.value && testPattern(password.value, PASSWORD_REGEX)) {
    return true;
  }

  return false;
});

const emailIsValid = computed(() => {
  if (!email.value) return true;

  return testPattern(email.value, EMAIL_REGEX);
});

const submitButtonDisabled = computed(() => {
  return !email.value || !password.value || !confirmPassword.value || !passwordValuesAreValid.value;
});

const triggerAlert = ({
  title,
  message,
  closeTime,
  theme = 'default',
}: EnrollmentFormTypes.TriggerAlertProps) => {
  alertData.value = { title, message, theme };

  if (closeTime) setTimeout(() => (alertData.value = undefined), closeTime);
};

const submitForm = async () => {
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
    <BaseInput
      labelValue="Email"
      v-model="email"
      :isValid="emailIsValid"
      errorMessage="Invalid email"
    />
    <PasswordField labelValue="Password" v-model="password" :isValid="passwordValuesAreValid" />
    <PasswordField
      labelValue="Confirm password"
      errorMessage="Invalid password. Requirements: A-Z, 0-9, and !#%$"
      v-model="confirmPassword"
      :isValid="passwordValuesAreValid"
    />
    <BaseButton
      value="Create Account"
      class="button"
      type="submit"
      :disabled="submitButtonDisabled"
    />
    <BaseButton value="Back" class="button" theme="secondary" @onClick="$router.back()" />
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
