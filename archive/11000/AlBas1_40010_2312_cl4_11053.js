// https://www.acmicpc.net/problem/11053
/*
가장 긴 증가하는 부분 수열

수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.

예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 10, 30, 20, 50} 이고, 길이는 4이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const [...A] = input[1].split(' ').map(Number);
// console.log(N, A);

// 문제 로직 - DP
/**
 * DP
1. 
idx까지의 A 부분 배열에서 증가하는 부분 수열의 최대 길이 저장할 DP 배열 준비,
모든 요소는 이미 자기자신을 요소로 길이 1의 수열이 될 수 있음 => 1로 초기화
2.
배열 A 의 요소들에 대해
자기 앞까지의 부분 배열에서
자신보다 작은 값들의 최대 DP값에 자신을 붙인 것이 자기 DP값
3.
전체에서 최대 DP값 출력
*/

const dp = new Array(N).fill(1);
for (let i = 1; i < N; i++) {
  let max = 0;
  for (let j = 0; j < i; j++) {
    if (A[j] < A[i]) max = Math.max(max, dp[j]);
  }
  dp[i] += max;
  // console.log('i', i, 'A[i]', A[i]);
  // console.log('max', max);
  // console.log('dp', dp);
}
console.log(Math.max(...dp));
