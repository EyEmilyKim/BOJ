// https://www.acmicpc.net/problem/7891
/*
Can you add this?

Given two integers, calculate and output their sum.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const n = +input.shift();
// console.log(n, input);

// 문제 로직
const result = [];
for (const i of input) {
  const [a, b] = i.split(' ').map(Number);
  result.push(a + b);
}
console.log(result.join('\n'));
