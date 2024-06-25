// https://www.acmicpc.net/problem/15990
/*
1, 2, 3 더하기 5

정수 4를 1, 2, 3의 합으로 나타내는 방법은 총 3가지가 있다. 합을 나타낼 때는 수를 1개 이상 사용해야 한다. 단, 같은 수를 두 번 이상 연속해서 사용하면 안 된다.
1+2+1
1+3
3+1
정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = +input.shift();
const num = input.map(Number);
// console.log(T, num);

// 문제 로직
/**
 * DP
 * 패턴 : 1,2,3의 합 / 마지막에 더해지는 숫자의 앞 항은 다른 숫자여야 함
  1 => 1
  2 => 2
  3 => 2+1, 1+2, 3
  4 => 3+1, 1+2+1, 1+3
    3 (=4-1)의 구성 중 +2 또는 +3으로 끝나는 수식에 +1
    2 (=4-2)의 구성 중 +1 또는 +3으로 끝나는 수식에 +2
    1 (=4-3)의 구성 중 +1 또는 +2으로 끝나는 수식에 +3
*/

// 각 숫자(idx)를 ..+1, ..+2, ..+3 로 나타내는 가짓수 구하기
const max = Math.max(...num);
const dp = new Array(max + 1).fill(null);
dp[1] = [null, 1, 0, 0];
dp[2] = [null, 0, 1, 0];
dp[3] = [null, 1, 1, 1];
for (let i = 4; i <= max; i++) {
  const p1 = (dp[i - 1][2] + dp[i - 1][3]) % 1000000009;
  const p2 = (dp[i - 2][1] + dp[i - 2][3]) % 1000000009;
  const p3 = (dp[i - 3][2] + dp[i - 3][1]) % 1000000009;
  dp[i] = [null, p1, p2, p3];
}
// console.log(dp);

// 출력
const result = [];
num.forEach((i) => {
  const sum = (dp[i][1] + dp[i][2] + dp[i][3]) % 1000000009;
  result.push(sum);
});
console.log(result.join('\n'));
