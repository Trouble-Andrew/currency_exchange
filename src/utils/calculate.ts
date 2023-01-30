export const calculate = (
  value: number | string,
  multiplier: number,
  revert: boolean = false,
): number => {
  let result;

  if (revert) {
    result = Number(value) / multiplier;
  } else {
    result = Number(value) * multiplier;
  }

  const integerPart = Math.trunc(result);
  const fixed = integerPart > 0 ? 2 : 5;

  return Number(result.toFixed(fixed));
};
