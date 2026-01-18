import { getRandomInt } from '@/shared/utils';
import { onMounted, ref } from 'vue';

export const useAnimationRules = () => {
  const leftLine = ref<HTMLElement | null>(null);
  const rightLine = ref<HTMLElement | null>(null);
  const topLine = ref<HTMLElement | null>(null);
  const bottomLine = ref<HTMLElement | null>(null);

  onMounted(() => {
    const setAnimationRules = (element: HTMLElement | null | undefined) => {
      if (element) {
        element.style.animationDuration = `${getRandomInt(3, 8)}s`;
        element.style.animationDirection = getRandomInt(0, 1) === 1 ? 'reverse' : '';
      }
    };

    setAnimationRules(leftLine.value);
    setAnimationRules(rightLine.value);
    setAnimationRules(topLine.value);
    setAnimationRules(bottomLine.value);
  });

  return {
    leftLine,
    rightLine,
    topLine,
    bottomLine,
  };
};
