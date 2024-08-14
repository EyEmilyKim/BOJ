// https://www.acmicpc.net/problem/2558
/*
A+B - 2

두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [a, b] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
// console.log(a, b);

// 문제 로직
console.log(a + b);
