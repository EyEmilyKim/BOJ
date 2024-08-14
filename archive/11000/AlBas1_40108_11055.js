// https://www.acmicpc.net/problem/11055
/*
가장 큰 증가하는 부분 

수열 A가 주어졌을 때, 그 수열의 증가하는 부분 수열 중에서 합이 가장 큰 것을 구하는 프로그램을 작성하시오.

예를 들어, 수열 A = {1, 100, 2, 50, 60, 3, 5, 6, 7, 8} 인 경우에 합이 가장 큰 증가하는 부분 수열은 A = {1, 100, 2, 50, 60, 3, 5, 6, 7, 8} 이고, 합은 113이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const A = input[1].split(' ').map(Number);
// console.log(N, A);

// 문제 로직
const dp = A.slice();
for (let i = 0; i < N; i++) {
  for (let j = 0; j <= i; j++) {
    if (A[j] < A[i] && dp[i] < dp[j] + A[i]) dp[i] = dp[j] + A[i];
  }
}
// console.log(dp);
console.log(Math.max(...dp));
