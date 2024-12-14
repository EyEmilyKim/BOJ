// https://www.acmicpc.net/problem/13277
/*
큰 수 곱셈

두 정수 A와 B가 주어졌을 때, 두 수의 곱을 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [a, b] = require('fs').readFileSync(path).toString().trim().split(' ').map(BigInt);
// console.log(a, b);

// 문제 로직
console.log((a * b).toString());
