import fs from 'fs';
import { BASE_NUMBERS, EXCEPTION_NUMBERS } from '../constants/lexer.js';

const { base, exceptions } = mapNumber();
const space = ' ';
const spaceExceptions = ['20'];
const ignoreNumbers = ['0'];

export function mapNumber(lang = 'spanish') {
  const rawdata = fs.readFileSync(`./lang/${lang}.json`);
  return JSON.parse(rawdata);
}

export function getLetter(number) {
  let word = '';
  let slicedNumber = number.slice(1);
  const exceptionNumber = getNumberWithZeros(number);

  if (BASE_NUMBERS.includes(number)) {
    return base[number];
  }

  if (EXCEPTION_NUMBERS.includes(exceptionNumber)) {
    word += exceptions[exceptionNumber] + space;
  }

  if (!word && BASE_NUMBERS.includes(exceptionNumber)) {
    word += base[exceptionNumber] + space;
  }

  for (let i = 1; i < number.length; i++) {
    const sliceNumberZeros = getNumberWithZeros(slicedNumber);
    // TODO: Get the paramaters from the JSON object

    if (i > number.length - 3 && base[slicedNumber]) {
      word += base[slicedNumber];
      break;
    }

    if (!ignoreNumbers.includes(number[i])) {
      word += exceptions[sliceNumberZeros] ?? base[sliceNumberZeros];
    }

    if (
      !spaceExceptions.includes(sliceNumberZeros) &&
      !ignoreNumbers.includes(number[i])
    ) {
      word += space;
    }

    slicedNumber = slicedNumber.slice(1);
  }

  return word;
}

function getNumberWithZeros(number) {
  const numberSplited = number.split('');
  for (let i = 1; i < number.length; i++) {
    numberSplited[i] = '0';
  }
  return numberSplited.toString().replaceAll(',', '');
}
