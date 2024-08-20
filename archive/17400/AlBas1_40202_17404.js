// https://www.acmicpc.net/problem/17404
/*
RGB거리 2

RGB거리에는 집이 N개 있다. 거리는 선분으로 나타낼 수 있고, 1번 집부터 N번 집이 순서대로 있다.

집은 빨강, 초록, 파랑 중 하나의 색으로 칠해야 한다. 각각의 집을 빨강, 초록, 파랑으로 칠하는 비용이 주어졌을 때, 아래 규칙을 만족하면서 모든 집을 칠하는 비용의 최솟값을 구해보자.

- 1번 집의 색은 2번, N번 집의 색과 같지 않아야 한다.
- N번 집의 색은 N-1번, 1번 집의 색과 같지 않아야 한다.
- i(2 ≤ i ≤ N-1)번 집의 색은 i-1, i+1번 집의 색과 같지 않아야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const [...cost] = input.map((i) => i.split(' ').map(Number));
// console.log(N, cost);

// 문제 로직
/**
 * dp
 * 첫번째 집의 색에 따라 N번째 집 색 달라져야 하므로 첫번째 집의 색을 정해놓고 시작.
 * 첫집이 Red, Green, Blue 일때의 시나리오(dp)를 각각 구하고, 그 중 최소값 선택.
 * (참고) https://minyeok2ee.gitlab.io/boj/boj-17404/
 */

let result = Infinity; // 각 시나리오 진행하며 최소값 갱신

for (let i = 0; i < 3; i++) {
  let dp = [];

  // 첫번째 집
  const one = i == 0 ? cost[0][0] : Infinity; // 시나리오 1. 첫집 Red
  const two = i == 1 ? cost[0][1] : Infinity; // 시나리오 2. 첫집 Green
  const three = i == 2 ? cost[0][2] : Infinity; // 시나리오 3. 첫집 Blue
  dp.push([one, two, three]);

  // 2 ~ N번째 집
  for (let j = 1; j < N; j++) {
    // 이전 집과 다른 색, 최소 비용
    const red = Math.min(dp[j - 1][1], dp[j - 1][2]) + cost[j][0];
    const green = Math.min(dp[j - 1][0], dp[j - 1][2]) + cost[j][1];
    const blue = Math.min(dp[j - 1][0], dp[j - 1][1]) + cost[j][2];
    dp.push([red, green, blue]);
  }

  // 최소값 갱신
  for (let k = 0; k < 3; k++) {
    // 첫집과 다른 색, 최소 비용
    if (i != k) result = Math.min(dp[N - 1][k], result);
  }
  // console.log(dp);
  // console.log(result);
}
console.log(result);
