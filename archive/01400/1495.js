// https://www.acmicpc.net/problem/1495
/*
기타리스트

Day Of Mourning의 기타리스트 강토는 다가오는 공연에서 연주할 N개의 곡을 연주하고 있다. 지금까지 공연과는 다른 공연을 보여주기 위해서 이번 공연에서는 매번 곡이 시작하기 전에 볼륨을 바꾸고 연주하려고 한다.

먼저, 공연이 시작하기 전에 각각의 곡이 시작하기 전에 바꿀 수 있는 볼륨의 리스트를 만들었다. 이 리스트를 V라고 했을 때, V[i]는 i번째 곡을 연주하기 전에 바꿀 수 있는 볼륨을 의미한다. 항상 리스트에 적힌 차이로만 볼륨을 바꿀 수 있다. 즉, 현재 볼륨이 P이고 지금 i번째 곡을 연주하기 전이라면, i번 곡은 P+V[i]나 P-V[i] 로 연주해야 한다. 하지만, 0보다 작은 값으로 볼륨을 바꾸거나, M보다 큰 값으로 볼륨을 바꿀 수 없다.

곡의 개수 N과 시작 볼륨 S, 그리고 M이 주어졌을 때, 마지막 곡을 연주할 수 있는 볼륨 중 최댓값을 구하는 프로그램을 작성하시오. 모든 곡은 리스트에 적힌 순서대로 연주해야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N, S, M], V] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, S, M, V);

// 문제 로직
function bfs(idx, N, S, M, V) {
  let answer = -1;

  let dp = new Array(51).fill(null).map((_) => new Array(1001).fill(false));
  dp[0][S] = true;

  for (let i = 1; i <= N; i++) {
    for (let j = 0; j <= M; j++) {
      if (!dp[i - 1][j]) continue;
      if (j - V[i - 1] >= 0) dp[i][j - V[i - 1]] = true;
      if (j + V[i - 1] <= M) dp[i][j + V[i - 1]] = true;
    }
  }

  for (let i = 0; i <= M; i++) {
    if (dp[N][i]) {
      if (i > answer) answer = i;
    }
  }

  return answer;
}

let result = bfs(0, N, S, M, V);
console.log(result);
