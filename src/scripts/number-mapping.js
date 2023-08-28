import fs from 'fs';
import { BASE_NUMBERS, EXCEPTION_NUMBERS } from '../constants/lexer.js';

const { base, exceptions } = mapNumber();

export function mapNumber(lang = 'spanish') {
  const rawdata = fs.readFileSync(`./lang/${lang}.json`);
  return JSON.parse(rawdata);
}

export function getLetter(number) {
  if (BASE_NUMBERS.includes(number)) {
    return base[number];
  }

  let word = '';

  const exceptionNumber = getNumberWithZeros(number);
  if (EXCEPTION_NUMBERS.includes(exceptionNumber)) {
    word += exceptions[exceptionNumber] + ' ';
  }

  if (!word && BASE_NUMBERS.includes(exceptionNumber)) {
    word += base[exceptionNumber] +" ";
  }

  let slicedNumber = number.slice(1);

  for (let i = 1; i < number.length; i++) {
    word += " ";
    
    if (i > number.length - 3 && base[slicedNumber]) {
      word += base[slicedNumber];
      break;
    }

    if (number[i] != '0') {
      const sliceNumberZeros = getNumberWithZeros(slicedNumber);
      word += exceptions[sliceNumberZeros] ?? base[sliceNumberZeros];
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
