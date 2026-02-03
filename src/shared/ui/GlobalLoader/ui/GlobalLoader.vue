<script setup lang="ts">
import { Dialog } from 'primevue';

const { showLoader } = defineProps<{ showLoader: boolean }>();
</script>

<template>
  <Dialog
    modal
    :closable="false"
    :visible="showLoader"
    style="background-color: transparent; border: none"
  >
    <span class="loader" />
  </Dialog>
</template>

<style lang="scss" scoped>
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
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  background: var(--gray-10);
  border-radius: 50%;
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
