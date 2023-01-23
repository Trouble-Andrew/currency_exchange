export const calculate = (
  value: number | string,
  multiplier: number,
): number => {
  const result = Number(value) * multiplier;
  const integerPart = Math.trunc(result);
  const fixed = integerPart > 0 ? 2 : 5;

  return Number(result.toFixed(fixed));
};
