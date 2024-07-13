// https://www.acmicpc.net/problem/1252
/*
이진수 덧셈

두 개의 이진수를 입력받아 이를 더하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [a, b] = require('fs').readFileSync(path).toString().trim().split(' ');
// console.log(a, b);

// 문제 로직

// 수 a, b 문자열 자릿수 맞추기
let longer, shorter;
if (a.length > b.length) {
  longer = a;
  shorter = b;
} else {
  longer = b;
  shorter = a;
}
const longlen = longer.length;
const shortlen = shorter.length;
const diff = longlen - shortlen;
let shorterFormatted = shorter;
for (let i = 0; i < diff; i++) shorterFormatted = '0' + shorterFormatted;
// console.log(longer, 'longer');
// console.log(shorterFormatted, 'shorterFormatted');

// 뒤에서부터 각자리 더하기
let sumString = '';
let carry = 0;
const len = longer.length;
for (let i = len - 1; i >= 0; i--) {
  const l = Number(longer[i]);
  const s = Number(shorterFormatted[i]);
  const sum = l + s + carry;
  if (sum >= 2) {
    sumString = (sum % 2) + sumString;
    carry = 1;
  } else {
    sumString = sum + sumString;
    carry = 0;
  }
}
sumString = String(carry) + sumString;

// 맨앞자리 0 이면 떼고 출력
let result;
let startIdx = sumString.indexOf('1');
if (startIdx === -1) {
  result = 0;
} else {
  result = sumString.slice(startIdx);
}
console.log(result);

/**
 * 최종 결과를 Number(result)로 변환하는 대신 문자열로 유지했다.
 * 이진수 덧셈의 결과를 숫자로 변환하는 과정에서, 큰 수의 경우 부정확한 결과가 출력될 수 있다고 한다.
 */
