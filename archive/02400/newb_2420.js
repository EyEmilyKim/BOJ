// https://www.acmicpc.net/problem/2420
/*
사파리월드

두 서브도메인의 유명도가 주어졌을 때, 그 차이를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((val) => +val);
// console.log(input);

// 문제 로직
const [N, M] = input;
const diff = Math.abs(N - M);
console.log(diff);
