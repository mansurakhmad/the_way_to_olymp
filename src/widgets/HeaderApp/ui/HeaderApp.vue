<script lang="ts" setup></script>

<template>
    <header class="header">
      <h1 class="title">The Way To Olymp</h1>
    </header>
</template>

<style lang="scss" scoped>
.title {
  margin: 0;
  background: linear-gradient(90deg, #fff 0%, #8b1d36 50%, #fff 100%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  text-transform: uppercase;
  animation: shimmer 4s linear infinite;
}

@keyframes shimmer {
  from {
    background-position: 0% center;
  }

  to {
    background-position: 200% center;
  }
}
</style>
