<script lang="ts" setup>
import { sendEnrollmentRequest } from '@/features/enrollment';
import { APP_ROUTES } from '@/shared/config';
import { BaseAlert, BaseButton, BaseInput } from '@/shared/ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref();
const password = ref();
const confirmPassword = ref();
const showSuccessAlert = ref(true);

const onBackClick = () => router.back();

const submitForm = async () => {
  if (!email.value || !password.value || !confirmPassword.value) return;

  if (password.value !== confirmPassword.value) return;

  try {
    await sendEnrollmentRequest({ email: email.value, password: password.value });

    email.value = '';
    password.value = '';
    confirmPassword.value = '';

    showSuccessAlert.value = true;

    setTimeout(() => {
      showSuccessAlert.value = false;

      router.push(APP_ROUTES.lOGIN);
    }, 5000);
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <form class="enrollmentForm" @submit.prevent="submitForm">
    <BaseInput labelValue="Email" v-model="email" />
    <BaseInput labelValue="Password" v-model="password" />
    <BaseInput labelValue="Confirm password" v-model="confirmPassword" />
    <BaseButton value="Create Account" class="button" type="submit" />
    <BaseButton value="Back" class="button" theme="secondary" @onClick="onBackClick" />
  </form>
  <BaseAlert
    :isVisible="showSuccessAlert"
    title="Successful registration"
    message="Check your email"
    :themeValue="'error'"
  />
</template>

<style lang="scss" scoped>
.enrollmentForm {
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 32px 12px;
  width: 100%;
  max-width: 400px;
  background-color: var(--glass-white);
  border-radius: 12px;
  color: var(--black-100);
  box-shadow: var(--shadow-overlay) 0 20px 30px -10px;
}
</style>
