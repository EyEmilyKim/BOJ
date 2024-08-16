// https://www.acmicpc.net/problem/11722
/*
가장 긴 감소하는 부분 수열

수열 A가 주어졌을 때, 가장 긴 감소하는 부분 수열을 구하는 프로그램을 작성하시오.

예를 들어, 수열 A = {10, 30, 10, 20, 20, 10} 인 경우에 가장 긴 감소하는 부분 수열은 A = {10, 30, 10, 20, 20, 10}  이고, 길이는 3이다.


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const A = input[1].split(' ').map(Number);
// console.log(N, A);

// 문제 로직
const dp = [];
for (let i = 0; i < N; i++) {
  let max = 0;
  for (let j = 0; j < i; j++) {
    if (A[j] > A[i] && dp[j] > max) max = dp[j];
  }
  dp[i] = max + 1;
}
// console.log(dp);
console.log(Math.max(...dp));
