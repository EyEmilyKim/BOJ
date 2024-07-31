// https://www.acmicpc.net/problem/2156
/*
포도주 시식

효주는 포도주 시식회에 갔다. 그 곳에 갔더니, 테이블 위에 다양한 포도주가 들어있는 포도주 잔이 일렬로 놓여 있었다. 효주는 포도주 시식을 하려고 하는데, 여기에는 다음과 같은 두 가지 규칙이 있다.

포도주 잔을 선택하면 그 잔에 들어있는 포도주는 모두 마셔야 하고, 마신 후에는 원래 위치에 다시 놓아야 한다.
연속으로 놓여 있는 3잔을 모두 마실 수는 없다.
효주는 될 수 있는 대로 많은 양의 포도주를 맛보기 위해서 어떤 포도주 잔을 선택해야 할지 고민하고 있다. 1부터 n까지의 번호가 붙어 있는 n개의 포도주 잔이 순서대로 테이블 위에 놓여 있고, 각 포도주 잔에 들어있는 포도주의 양이 주어졌을 때, 효주를 도와 가장 많은 양의 포도주를 마실 수 있도록 하는 프로그램을 작성하시오. 

예를 들어 6개의 포도주 잔이 있고, 각각의 잔에 순서대로 6, 10, 13, 9, 8, 1 만큼의 포도주가 들어 있을 때, 첫 번째, 두 번째, 네 번째, 다섯 번째 포도주 잔을 선택하면 총 포도주 양이 33으로 최대로 마실 수 있다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [n, ...data] = input.map(Number);
const wine = [0, ...data];
// console.log(n, wine);

// 문제 로직
/**
 * dp[n] : 1~n번째 잔까지 주어질 때 마실 수 있는 포두주 양의 최대값. 
=> 다음 세가지 경우 중 최대값
- dp[n-3] + wine[n-1] + wine[n] // (n-2) 거르고, (n-1), (n) 연속으로 마심
- dp[n-2] + wine[n] // (n-1) 거르고, n 하나 마심
- dp[n-1] // 위 두 경우보다 (n-1)이 더 커서 (n) 을 안마심 
*/

let result = 0;
if (n === 1) result = wine[1];
else if (n === 2) result = wine[1] + wine[2];
else {
  const dp = new Array(n + 1).fill(0);
  dp[1] = wine[1];
  dp[2] = wine[1] + wine[2];
  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(dp[i - 3] + wine[i - 1] + wine[i], dp[i - 2] + wine[i], dp[i - 1]);
  }
  // console.log(dp);
  result = dp[n];
}
console.log(result);
