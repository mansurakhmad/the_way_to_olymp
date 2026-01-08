<script setup lang="ts">
import { APP_ROUTES, PASSWORD_REGEX } from '@/shared/config';
import { BaseAlert, PasswordField, useAlert } from '@/shared/ui';
import { BaseButton } from '@/shared/ui';
import { testPattern } from '@/shared/utils';
import { computed, ref } from 'vue';
import RulesList from './RulesList.vue';
import { sendRestorePasswordRequest } from '@/features/restorePassword';
import { AuthError } from '@supabase/supabase-js';
import { useRouter } from 'vue-router';

const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const { alertData, triggerAlert } = useAlert();

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

const submit = async () => {
  try {
    const response = await sendRestorePasswordRequest(password.value);
    router.replace({ path: APP_ROUTES.lOGIN, query: { email: `${response.user.email}` } });
  } catch (error) {
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
  <form class="recoveryPasswordForm" @submit.prevent="submit">
    <RulesList :password="password" />
    <PasswordField labelValue="New password" :isValid="passwordValuesAreValid" v-model="password" />
    <PasswordField
      labelValue="Repeat new password"
      :isValid="passwordValuesAreValid"
      v-model="confirmPassword"
    />
    <BaseButton value="Submit" type="submit" :disabled="submitButtonIsDisabled" />
  </form>
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
  gap: 32px;
  padding: 24px 12px;
  width: 100%;
  max-width: 400px;
  background-color: var(--glass-white);
  border-radius: 12px;
  color: var(--black-100);
  box-shadow: var(--shadow-overlay) 0 20px 30px -10px;
}
</style>
