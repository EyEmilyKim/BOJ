// https://www.acmicpc.net/problem/13398
/*
연속합 2

n개의 정수로 이루어진 임의의 수열이 주어진다. 우리는 이 중 연속된 몇 개의 수를 선택해서 구할 수 있는 합 중 가장 큰 합을 구하려고 한다. 단, 수는 한 개 이상 선택해야 한다. 또, 수열에서 수를 하나 제거할 수 있다. (제거하지 않아도 된다)

예를 들어서 10, -4, 3, 1, 5, 6, -35, 12, 21, -1 이라는 수열이 주어졌다고 하자. 여기서 수를 제거하지 않았을 때의 정답은 12+21인 33이 정답이 된다.

만약, -35를 제거한다면, 수열은 10, -4, 3, 1, 5, 6, 12, 21, -1이 되고, 여기서 정답은 10-4+3+1+5+6+12+21인 54가 된다.

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
 * 제거 없는 연속합 dp 와, 해당 idx 를 제거할 때의 연속합 dp 각각 구해서 최대값 출력.
 */

const dp = [A[0]]; // 제거 없는 연속합
const dp_cut = [A[0]]; // 해당 idx 제거할 때의 연속합
for (let i = 1; i < N; i++) {
  dp[i] = A[i] > A[i] + dp[i - 1] ? A[i] : A[i] + dp[i - 1];
}
for (let i = 1; i < N; i++) {
  dp_cut[i] = dp[i - 1] > A[i] + dp_cut[i - 1] ? dp[i - 1] : A[i] + dp_cut[i - 1];
}
// console.log(dp);
// console.log(dp_cut);
console.log(Math.max(Math.max(...dp), Math.max(...dp_cut)));
