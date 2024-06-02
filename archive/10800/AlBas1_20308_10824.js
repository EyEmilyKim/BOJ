// https://www.acmicpc.net/problem/10824
/*
네 수

네 자연수 A, B, C, D가 주어진다. 이때, A와 B를 붙인 수와 C와 D를 붙인 수의 합을 구하는 프로그램을 작성하시오.

두 수 A와 B를 합치는 것은 A의 뒤에 B를 붙이는 것을 의미한다. 즉, 20과 30을 붙이면 2030이 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((i) => +i);
// console.log(input);

// 문제 로직
const num1 = input[0].toString() + input[1].toString();
const num2 = input[2].toString() + input[3].toString();
// console.log(num1, num2);
const result = Number(num1) + Number(num2);
console.log(result);
