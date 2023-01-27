export const calculateChange = (curr: number, prev: number) => {
  return Number(((curr / prev) * 100 - 100).toFixed(2));
};
