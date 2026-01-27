<script setup lang="ts">
import { computed, ref } from 'vue';

import RulesList from './RulesList.vue';

import { useRecoveryPassword } from '@/features/recoveryPassword';
import { PASSWORD_REGEX } from '@/shared/config';
import { BaseAlert, PasswordField } from '@/shared/ui';
import { BaseButton } from '@/shared/ui';
import { testPattern } from '@/shared/utils';

const password = ref('');
const confirmPassword = ref('');
const { recoveryPassword, alertData } = useRecoveryPassword();

const passwordValuesAreValid = computed(() => {
  if (!confirmPassword.value) return true;

  if (password.value === confirmPassword.value && testPattern(password.value, PASSWORD_REGEX)) {
    return true;
  }

  return false;
});

const submitButtonIsDisabled = computed(() => {
  return !password.value || !confirmPassword.value || !passwordValuesAreValid.value;
});

const submit = () => recoveryPassword(password.value);
</script>

<template>
  <Transition name="slide-up" appear>
    <form class="recoveryPasswordForm" @submit.prevent="submit">
      <RulesList :password="password" />
      <PasswordField
        labelValue="New password"
        :isValid="passwordValuesAreValid"
        v-model="password"
      />
      <PasswordField
        labelValue="Repeat new password"
        :isValid="passwordValuesAreValid"
        v-model="confirmPassword"
      />
      <BaseButton value="Submit" type="submit" :disabled="submitButtonIsDisabled" />
    </form>
  </Transition>
  <BaseAlert v-if="alertData" :isVisible="!!alertData" :themeValue="alertData.theme">
    <template #title>{{ alertData?.title }}</template>
    <template #message>{{ alertData?.message }}</template>
  </BaseAlert>
</template>

<style lang="scss" scoped>
.recoveryPasswordForm {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 44px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  color: var(--black-100);
}

.slide-up-enter-active {
  transition: all 0.85s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(50%);
}
</style>
