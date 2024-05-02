// https://www.acmicpc.net/problem/1330
/*
두 정수 A와 B가 주어졌을 때, A와 B를 비교하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const [A, B] = require('fs')
  .readFileSync('example.txt')
  .toString()
  .split(' ')
  .map((val) => +val);

// 문제 로직
let res = '';
if (A > B) res = '>';
else if (A < B) res = '<';
else if (A == B) res = '==';
console.log(res);
