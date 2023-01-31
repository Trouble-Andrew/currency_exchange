interface ObjectLiteral {
  [key: string]: unknown;
}

export const objectToArray = (obj: ObjectLiteral) => {
  return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
};
