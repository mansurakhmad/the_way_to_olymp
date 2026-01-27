<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useEnrollment } from '@/features/enrollment';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/shared/config';
import { BaseAlert, BaseButton, BaseInput, PasswordField } from '@/shared/ui';
import { testPattern } from '@/shared/utils';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const { enroll, alertData } = useEnrollment(email, password, confirmPassword);

const passwordValuesAreValid = computed(() => {
  if (!confirmPassword.value) return true;

  return password.value === confirmPassword.value && testPattern(password.value, PASSWORD_REGEX);
});

const emailIsValid = computed(() => {
  if (!email.value) return true;

  return testPattern(email.value, EMAIL_REGEX);
});

const submitButtonDisabled = computed(() => {
  return !email.value || !password.value || !confirmPassword.value || !passwordValuesAreValid.value;
});

const submitForm = () => {
  alertData.value = null;
  enroll({ email: email.value, password: password.value });
};
</script>

<template>
  <Transition name="slide-up" appear>
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
      <div class="buttons">
        <BaseButton
          value="Create Account"
          class="button"
          type="submit"
          theme="accent"
          :disabled="submitButtonDisabled"
        />
        <BaseButton value="Back" class="button" theme="secondary" @onClick="$router.back()" />
      </div>
    </form>
  </Transition>
  <BaseAlert v-if="alertData" :isVisible="!!alertData" :themeValue="alertData.theme">
    <template #title>{{ alertData?.title }}</template>
    <template #message>{{ alertData?.message }}</template>
  </BaseAlert>
</template>

<style lang="scss" scoped>
.enrollmentForm {
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  color: var(--black-100);
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.slide-up-enter-active {
  transition: all 0.85s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(50%);
}
</style>
