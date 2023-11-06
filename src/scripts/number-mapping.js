import fs from 'fs';
import { BASE_NUMBERS, EXCEPTION_NUMBERS } from '../constants/lexer.js';

const { base, exceptions } = mapNumber();
const space = ' ';
const spaceExceptions = ['20'];
const ignoreNumbers = ['0'];
const connector = 'y';
const prefixNumbers = ['1000000', '1000'];

const numbers = {
  zero: "0"
}

const isNumberPrefix = number => {
  const filterNumberLenght = prefixNumbers.filter(
    prefix => prefix.length <= number.length,
  );
  return filterNumberLenght.length > 0 && !BASE_NUMBERS.includes(number);
};


export function mapNumber(lang = 'spanish') {
  const rawdata = fs.readFileSync(`./lang/${lang}.json`);
  return JSON.parse(rawdata);
}


export function getLetter(number) {
  let slicedNumber = number.slice(1);
  let word = getLetterPrefix(number);

  if (BASE_NUMBERS.includes(number)) {
    return base[number];
  }

  for (let i = 1; i < number.length; i++) {
    const sliceNumberZeros = getNumberWithZeros(slicedNumber);
    // TODO: Get the paramaters from the JSON object
    const numberSeparated = number.split('');
    const isZeros = slicedNumber.split('').some(number => number != numbers.zero);


    if (i > number.length - 3 && base[slicedNumber] && slicedNumber != numbers.zero) {
      if (
        connector &&
        !spaceExceptions.includes(sliceNumberZeros) &&
        isZeros &&
        numberSeparated[numberSeparated.length - 1] != numbers.zero
      ) {
        word += connector + space;
      }
      word += base[slicedNumber] + space 
      break;
    }

    if (!ignoreNumbers.includes(number[i])) {
      word += exceptions[sliceNumberZeros] ?? base[sliceNumberZeros];

      if (!spaceExceptions.includes(sliceNumberZeros)) {
        word += space;
      }

    }



    slicedNumber = slicedNumber.slice(1);
  }

  return word;
}


function getLetterPrefix(number) {
  let word = '';
  const exceptionNumber = getNumberWithZeros(number);

  if (EXCEPTION_NUMBERS.includes(exceptionNumber)) {
    word += exceptions[exceptionNumber];
  }

  if (!word && BASE_NUMBERS.includes(exceptionNumber)) {
    word += base[exceptionNumber] + space;
  }

  // if (isNumberPrefix(number)) {
  //   word += 'mil' + space;
  // }

  if (EXCEPTION_NUMBERS.includes(exceptionNumber) && !spaceExceptions.includes(exceptionNumber)) {
    word += space;
  }


  return word;
}


function getPrefixNumber(number) {
  const filterNumberLenght = prefixNumbers.filter(
    prefix => prefix.length <= number.length,
  );
  const maxValue = Math.max(...filterNumberLenght);
  const maxSplited = maxValue.toString().split('');
  const value = number.split('');

  for (let i = 1; i < maxSplited.length; i++) {
    value.pop();
  }

  return value;
}

function getNumberWithZeros(number) {
  const numberSplited = number.split('');
  for (let i = 1; i < number.length; i++) {
    numberSplited[i] = '0';
  }
  return numberSplited.toString().replaceAll(',', '');
}
