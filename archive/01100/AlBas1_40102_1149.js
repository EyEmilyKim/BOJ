// https://www.acmicpc.net/problem/1149
/*
RGB거리

RGB거리에는 집이 N개 있다. 거리는 선분으로 나타낼 수 있고, 1번 집부터 N번 집이 순서대로 있다.

집은 빨강, 초록, 파랑 중 하나의 색으로 칠해야 한다. 각각의 집을 빨강, 초록, 파랑으로 칠하는 비용이 주어졌을 때, 아래 규칙을 만족하면서 모든 집을 칠하는 비용의 최솟값을 구해보자.

- 1번 집의 색은 2번 집의 색과 같지 않아야 한다.
- N번 집의 색은 N-1번 집의 색과 같지 않아야 한다.
- i(2 ≤ i ≤ N-1)번 집의 색은 i-1번, i+1번 집의 색과 같지 않아야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const rgb = input.map((i) => i.split(' ').map(Number));
// console.log(N, rgb);

// 문제 로직
/**
 * 2차원 배열 DP
// dp[n][0] : n번집 Red
// dp[n][1] : n번집 Green
// dp[n][2] : n번집 Blue ... 로 칠할 때 전체비용의 최소값

 * N번집 R인 최소 전체비용 
=> N-1번집 G or B 인 전체비용 중 적은 것에 N번집 R 로 칠하는 비용 합
*/

const dp = Array.from(new Array(N + 1), () => new Array(3).fill(0));
dp[1] = rgb[0];
for (let i = 2; i <= N; i++) {
  dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + rgb[i - 1][0];
  dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + rgb[i - 1][1];
  dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + rgb[i - 1][2];
}
// console.log(dp);
console.log(Math.min(...dp[N]));
