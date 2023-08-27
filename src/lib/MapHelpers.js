/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-exponentiation-operator */
const insertRight = (str, fromEnd, ins) => {
  const index = str.length - fromEnd;
  const before = str.substring(0, index)
  const after = str.substring(index, str.length);
  return before + ins + after;
};

export const downAccuracy = (d, digits=5) => insertRight(Math.floor(d * Math.pow(10, digits)).toString(10), digits, '.');
export const ceilAccuracy = (d, digits=5) => insertRight(Math.ceil(d * Math.pow(10, digits)).toString(10), digits, '.');
