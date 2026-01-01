<script setup lang="ts"></script>

<template>
  <div class="app">
    <h1>The Way To Olymp</h1>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  padding: 18px;
  height: 100vh;
  background-color: var(--wine-100);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 25%;
  background-image: url('../shared/assets/appBg.jpg');
}
</style>
