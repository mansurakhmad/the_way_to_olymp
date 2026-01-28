<script setup lang="ts">
import { computed, ref } from 'vue';

import { useRouter } from 'vue-router';

import { useForgotPassword } from '@/features/forgotPassword';
import { EMAIL_REGEX } from '@/shared/config';
import { BaseButton, BaseInput } from '@/shared/ui';
import { testPattern } from '@/shared/utils';

const email = ref('');
const router = useRouter();
const { mutate } = useForgotPassword(email);

const emailIsValid = computed(() => {
  if (!email.value) return true;

  return testPattern(email.value, EMAIL_REGEX);
});

const submitIsDisable = computed(() => !email.value || !emailIsValid.value);

const submit = () => mutate();
</script>

<template>
  <Transition name="slide-up" appear>
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
  </Transition>
</template>

<style lang="scss" scoped>
.forgotPasswordForm {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
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
