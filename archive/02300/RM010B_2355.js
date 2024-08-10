// https://www.acmicpc.net/problem/2037
/*
시그마

두 정수 A와 B가 주어졌을 때, 두 정수 사이에 있는 수의 합을 구하는 프로그램을 작성하시오. 사이에 있는 수들은 A와 B도 포함한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [a, b] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(a, b);

// 문제 로직
/**
 * 단순 for 문으로 다 더하면 시간초과.
 * 두 정수 a,b 가 꼭 a<b 라는 보장이 없다.
 * 가우스 법칙 => 1 ~ n 까지 수의 합 A = n * (n+1) / 2
 */
let sigma = 0;
if (a > b) sigma = ((a - b + 1) * (a + b)) / 2;
else sigma = ((b - a + 1) * (a + b)) / 2;
console.log(sigma);
