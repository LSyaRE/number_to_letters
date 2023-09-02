import { getLetter, mapNumber } from './scripts/number-mapping.js';

export function numberToLetter(number) {
  try {
    if (!number && number !== 0) {
      throw `The number shouldn\'t be null`;
    }
    
    if (typeof number != 'number') {
      throw `The value should be a number`;
    }

    const numberToString = number.toString();
    console.log(getLetter(numberToString));
    return getLetter(numberToString);
  } catch (e) {
    console.error(e);
    return;
  }
}

export function letterToNumber() {}

const objectOfNumbers = {
  number: 0,
};

numberToLetter(objectOfNumbers);
