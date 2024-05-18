// https://www.acmicpc.net/problem/10871
/*
X보다 작은 수

정수 N개로 이루어진 수열 A와 정수 X가 주어진다. 이때, A에서 X보다 작은 수를 모두 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);
// const num = Number(input[0].split(' ')[0]);
const X = Number(input[0].split(' ')[1]);
const A = input[1].split(' ').map((val) => +val);
// console.log(num);
// console.log(X);
// console.log(A);

// 문제 로직
let result = '';
// for (i = 0; i < num; i++) {
//   if (A[i] < X) result += A[i] + ' ';
// }
A.forEach((i) => {
  if (i < X) result += i + ' ';
});
console.log(result.trim());
