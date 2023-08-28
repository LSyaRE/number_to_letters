import { getLetter, mapNumber } from './scripts/number-mapping.js';

export function numberToLetter(number) {
  // if (!number | 0) {
  //   throw `The number shouldn\'t be null`;
  // }
  const numberToString = number.toString();
  console.log(getLetter(numberToString));
  return getLetter(numberToString);
}

export function letterToNumber() {}

numberToLetter(1426);
