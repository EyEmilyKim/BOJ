// https://www.acmicpc.net/problem/1912
/*
연속합

n개의 정수로 이루어진 임의의 수열이 주어진다. 우리는 이 중 연속된 몇 개의 수를 선택해서 구할 수 있는 합 중 가장 큰 합을 구하려고 한다. 단, 수는 한 개 이상 선택해야 한다.

예를 들어서 10, -4, 3, 1, 5, 6, -35, 12, 21, -1 이라는 수열이 주어졌다고 하자. 여기서 정답은 12+21인 33이 정답이 된다.


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const nums = input[1].split(' ').map(Number);
// console.log(N, nums); // 세로 N, 가로 M (N ≤ M) // n(1 ≤ n ≤ 100,000)

// 문제 로직
/**
 * DP
 * 각 자리마다 [이전 것에 더하는게 좋을지] vs [현재 값부터 다시 시작하는게 좋을지]
 */
const dp = new Array(N).fill(0); // dp[i] : nums[i]까지의 최대 연속합 저장
dp[0] = nums[0];
for (let i = 1; i < N; i++) {
  dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
  // console.log(i, nums, '\ndp', dp);
}
console.log(Math.max(...dp)); // 전체 연속합 중 최대값 출력
