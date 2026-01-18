<script setup lang="ts">
import type { WidgetContainerTypes } from '../models';
import { useAnimationRules } from '../composables';

const { theme = 'Gold' } = defineProps<WidgetContainerTypes.Props>();

const linesRefs = useAnimationRules();
</script>

<template>
  <div class="widgetSkeleton" :class="`widgetTheme${theme}`">
    <div class="line left" :ref="linesRefs.leftLine" />
    <div class="line top" :ref="linesRefs.topLine" />
    <div class="line right" :ref="linesRefs.rightLine" />
    <div class="line bottom" :ref="linesRefs.bottomLine" />
    <div class="content">
      <div class="header">
        <p class="title">
          <slot name="title" />
        </p>
      </div>
      <div class="body">
        <slot name="content" />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.widgetSkeleton {
  position: relative;
  padding: 24px;
  min-height: 150px;
  border-radius: 12px;
  overflow: hidden;

  .line {
    position: absolute;
    height: 2px;

    &.left,
    &.right {
      top: 50%;
      width: 2px;
      height: 55%;
      transform: translateY(-50%);
    }

    &.top,
    &.bottom {
      left: 0;
      width: 70%;
    }

    &.left {
      left: 0;
      animation: move-vertical ease-in infinite;
    }

    &.top {
      top: 0;
      animation: move-horizontal ease-in infinite;
    }

    &.right {
      right: 0;
      animation: move-vertical ease-in-out infinite;
    }

    &.bottom {
      bottom: 0;
      animation: move-horizontal ease-in-out infinite;
    }
  }

  &.widgetThemeGold {
    background-color: var(--gold-10-o-15);
    border: 1px solid var(--gold-10);

    .line {
      background: var(--gold-10-o-10);
      box-shadow:
        0 0 5px var(--white-100),
        0 0 10px var(--gold-10),
        0 0 20px var(--gold-10),
        0 0 40px var(--gold-10);
    }
  }

  &.widgetThemeBlue {
    background-color: var(--cyan-10-o-10);
    border: 1px solid var(--cyan-10-o-50);

    .line {
      background: var(--cyan-50);
      box-shadow:
        0 0 5px var(--white-100),
        0 0 10px var(--cyan-10),
        0 0 20px var(--cyan-10),
        0 0 40px var(--cyan-10);
    }
  }

  &.widgetThemeRed {
    background-color: var(--wine-10-o-20);
    border: 1px solid var(--wine-10);

    .line {
      background: var(--wine-100);
      box-shadow:
        0 0 5px var(--white-100),
        0 0 10px var(--wine-50),
        0 0 20px var(--wine-50),
        0 0 40px var(--wine-50);
    }
  }
}

.content {
  display: flex;
  gap: 24px;
  height: 100%;
  flex-wrap: wrap;

  .header,
  .body,
  .footer {
    width: 100%;
  }
}

.header {
  .title {
    font-size: 20px;
    font-weight: 500;
    text-transform: uppercase;
  }
}

.body {
  height: calc(80% - 48px - 10%);
}

.footer {
  align-self: flex-end;
}

@keyframes move-horizontal {
  0% {
    left: -70%;
  }

  50% {
    left: 140%;
  }

  100% {
    left: -70%;
  }
}

@keyframes move-vertical {
  0% {
    top: -50%;
  }

  50% {
    top: 100%;
  }

  100% {
    top: -50%;
  }
}
</style>
