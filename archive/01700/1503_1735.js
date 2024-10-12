// https://www.acmicpc.net/problem/1735
/*
분수 합

분수 A/B는 분자가 A, 분모가 B인 분수를 의미한다. A와 B는 모두 자연수라고 하자.

두 분수의 합 또한 분수로 표현할 수 있다. 두 분수가 주어졌을 때, 그 합을 기약분수의 형태로 구하는 프로그램을 작성하시오. 기약분수란 더 이상 약분되지 않는 분수를 의미한다.


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [a, b] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((row) => row.split(' ').map(Number));
// console.log(a, b);

// 문제 로직
/**
 * 유클리드 호제법
 */

// 1. 두 분수 a + b => 분수 sum 구하기
// sum 분모는 두 분모의 최소공배수
const [a_top, a_bot] = a;
const [b_top, b_bot] = b;
let sum_top, sum_bot;
sum_bot = getGCDorLCM(a_bot, b_bot, 1);
sum_top = a_top * (sum_bot / a_bot) + b_top * (sum_bot / b_bot);
// console.log(`a : ${a_top}/${a_bot}`);
// console.log(`b : ${b_top}/${b_bot}`);
// console.log(`sum : ${sum_top}/${sum_bot}`);

// 2. sum => 기약분수 result 구하기
let result_top, result_bot;
const sumGCD = getGCDorLCM(sum_top, sum_bot, 0);
const canBeSimplified = sumGCD === 1 ? false : true;
if (canBeSimplified) {
  result_top = sum_top / sumGCD;
  result_bot = sum_bot / sumGCD;
} else {
  result_top = sum_top;
  result_bot = sum_bot;
}

// 3. 결과 출력
console.log(`${result_top} ${result_bot}`);

// 최대공약수(target:0), 최소공배수(target:1) 구하는 함수 (유클리드 호제법)
function getGCDorLCM(a, b, target) {
  let [x, y] = [a, b].sort((a, b) => a - b);
  let r;
  while (y) {
    r = x % y;
    x = y;
    y = r;
  }
  const GCD = x;
  // console.log('GCD', GCD);
  // 최대공약수 반환
  if (target == 0) return GCD;

  // 최소공배수 반환
  const LCM = (a * b) / GCD;
  // console.log('LCM', LCM);
  return LCM;
}
