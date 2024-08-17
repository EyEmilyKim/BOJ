// https://www.acmicpc.net/problem/11054
/*
가장 긴 바이토닉 부분 수열

수열 S가 어떤 수 Sk를 기준으로 S1 < S2 < ... Sk-1 < Sk > Sk+1 > ... SN-1 > SN을 만족한다면, 그 수열을 바이토닉 수열이라고 한다.

예를 들어, {10, 20, 30, 25, 20}과 {10, 20, 30, 40}, {50, 40, 25, 10} 은 바이토닉 수열이지만, {1, 2, 3, 2, 1, 2, 3, 2, 1}과 {10, 20, 30, 40, 20, 30} 은 바이토닉 수열이 아니다.

수열 A가 주어졌을 때, 그 수열의 부분 수열 중 바이토닉 수열이면서 가장 긴 수열의 길이를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const A = input[1].split(' ').map(Number);
// console.log(N, A);

// 문제 로직
/**
 * dp
 * 가능한 바이토닉 수열의 최대 길이 = 처음부터 현재 index 까지의 증가수열 길이 + 현재 index 부터 마지막까지의 감소수열의 길이
 */

// 처음 ~ index, 증가하는 DP
const dp_increase = new Array(N).fill(1);
for (let i = 0; i < N; i++) {
  const cur = A[i];
  let cnt = 1;
  for (let j = 0; j < i; j++) {
    const compare = A[j];
    if (cur > compare) cnt = Math.max(cnt, dp_increase[j] + 1);
  }
  dp_increase[i] = cnt;
}

// index ~ 마지막, 감소하는 DP
const dp_decrease = new Array(N).fill(1);
for (let i = N - 1; i >= 0; i--) {
  const cur = A[i];
  let cnt = 1;
  for (let j = i + 1; j < N; j++) {
    const compare = A[j];
    if (cur > compare) cnt = Math.max(cnt, dp_decrease[j] + 1);
  }
  dp_decrease[i] = cnt;
}

// console.log(dp_increase);
// console.log(dp_decrease);

// 바이토닉 수열 DP
const dp_bitonic = dp_increase.map((incVal, idx) => incVal + dp_decrease[idx] - 1);
// console.log(dp_bitonic);
console.log(Math.max(...dp_bitonic));
