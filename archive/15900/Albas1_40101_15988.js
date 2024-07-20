// https://www.acmicpc.net/problem/15988
/**
1, 2, 3 더하기 3

정수 4를 1, 2, 3의 합으로 나타내는 방법은 총 7가지가 있다. 합을 나타낼 때는 수를 1개 이상 사용해야 한다.

1+1+1+1
1+1+2
1+2+1
2+1+1
2+2
1+3
3+1
정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 프로그램을 작성하시오.
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const [T, ...test] = input;
// console.log(T, test);

// 문제 로직
/**
 * DP
1 => 1 (1)
2 => 1+1, 2 (2)
3 => 1+1+1, 1+2, 2+1, 3 (4)
4 => 1+1+1+1, 1+2+1, 2+1+1, 3+1
      1+1+2, 2+2,
      1+3 => (4+2+1)
*/

// 테스트 케이스 최대값까지의 dp 배열 구하기
let dp = [-1, 1, 2, 4];
let max = Math.max(...test);
let divider = 1000000009;
for (let i = 4; i <= max; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % divider;
}
// console.log(dp);

// 작업 수행
const result = [];
for (let t of test) {
  result.push(dp[t]);
}
console.log(result.join('\n'));
