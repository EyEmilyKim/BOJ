// https://www.acmicpc.net/problem/14501
/*
퇴사

상담원으로 일하고 있는 백준이는 퇴사를 하려고 한다.

오늘부터 N+1일째 되는 날 퇴사를 하기 위해서, 남은 N일 동안 최대한 많은 상담을 하려고 한다.

백준이는 비서에게 최대한 많은 상담을 잡으라고 부탁을 했고, 비서는 하루에 하나씩 서로 다른 사람의 상담을 잡아놓았다.

각각의 상담은 상담을 완료하는데 걸리는 기간 Ti와 상담을 했을 때 받을 수 있는 금액 Pi로 이루어져 있다.

N = 7인 경우에 다음과 같은 상담 일정표를 보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const options = input.map((i) => i.split(' ').map(Number));
// console.log(N, options);

// 문제 로직
/**
 * dp[n] : n일차까지의 최대 수익
1. 퇴사일 전에 처리할 수 없는 일은 제외
2. 기존 수익 + 해당일에 있는 상담 진행할 때 얻는 수익 DP[n] 에 저장
3. 해당 상담 진행했을 경우와, 다른 상담 진행했을 경우의 최대값 비교하여 dp에 저장
 */

const dp = new Array(N).fill(0); // dp[N] : N일차까지의 최대 수익
for (let i = 0; i < N; i++) {
  // 0일 ~ 6일
  const [span, profit] = options[i];
  if (i + span > N) continue; // 퇴사일 후까지 걸치는 상담은 불가.
  dp[i] += profit;
  for (let j = i + span; j < N; j++) dp[j] = Math.max(dp[j], dp[i]);
}
// console.log(dp);
console.log(Math.max(...dp));
