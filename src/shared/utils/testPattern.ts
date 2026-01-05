export const testPattern = (value: string, pattern: RegExp) => {
  const result = pattern.test(value);

  return result;
};
