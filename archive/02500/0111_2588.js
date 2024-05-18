// https://www.acmicpc.net/problem/2588
/*
곱셈

(세 자리 수) × (세 자리 수)는 다음과 같은 과정을 통하여 이루어진다.
...
(1)과 (2)위치에 들어갈 세 자리 자연수가 주어질 때 (3), (4), (5), (6)위치에 들어갈 값을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split('\n');
const [A, B] = input.map((val) => +val);
// console.log(`A:${A}, B:${B}`);

// 문제 로직

// const a0 = A % 10 / 1;
// const a1 = parseInt((A % 100) / 10);
// const a2 = parseInt((A % 1000) / 100);
// console.log(`a0:${a0}, a1:${a1}, a2:${a2}`);
const a = [];
const b = [];
for (i = 0; i < 3; i++) {
  a[i] = parseInt((A % Math.pow(10, i + 1)) / Math.pow(10, i));
  b[i] = parseInt((B % Math.pow(10, i + 1)) / Math.pow(10, i));
}
// console.log(`a:[${a}]\nb:[${b}]`);

const mid = [];
for (i = 0; i < 3; i++) {
  mid[i] = b[i] * A;
  console.log(mid[i]);
}

let result = 0;
for (i = 0; i < 3; i++) {
  result += mid[i] * Math.pow(10, i);
}
console.log(result);
