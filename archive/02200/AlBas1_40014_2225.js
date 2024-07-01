// https://www.acmicpc.net/problem/2225
/*
합분해

0부터 N까지의 정수 K개를 더해서 그 합이 N이 되는 경우의 수를 구하는 프로그램을 작성하시오.
덧셈의 순서가 바뀐 경우는 다른 경우로 센다(1+2와 2+1은 서로 다른 경우). 또한 한 개의 수를 여러 번 쓸 수도 있다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(' ');
const [N, K] = input.map(Number);
// console.log(N, K);

// 문제 로직
/**
 * 2차원 DP
1. 모든 N에 대하여 1개의 수의 합으로 표현할 수 있는 것은 자기 자신 1번 밖에 없다.
  0은 몇번을 합해도 0이다.

K/N   0   1   2   3   4   5
  0   0   0   0   0   0   0
  1   1   1   1   1   1   1
  2   1   -   -   -   -   -
  3   1   -   -   -   -   -

2. N=5, K=2인 경우는 ?
  5 => 5 + (N=0, K=1)
       4 + (N=1, K=1)
       3 + (N=2, K=1)
       2 + (N=3, K=1)
       1 + (N=4, K=1)
       0 + (N=5, K=1)
  그런데 모든 K=1 인 경우는 자기자신을 쓰는 한가지 경우 뿐이니까
  N=5, K=2 인 경우의 수는 1+1+1+1+1+1 = 6 이다.

K/N   0   1   2   3   4   5
  0   0   0   0   0   0   0
  1   1   1   1   1   1   1
  2   1   2   3   4   5   6
  3   1   -   -   -   -   -

여기서 보이는 규칙 ! 
  => dp[r][c] = dp[r-1][c] + dp[r][c-1]
*/

const mod = 10 ** 9;
const dp = Array.from(new Array(K + 1), () => new Array(N + 1).fill(0));
for (let c = 0; c <= N; c++) dp[1][c] = 1;
for (let r = 2; r <= K; r++) dp[r][0] = 1;

for (let r = 2; r <= K; r++) {
  for (let c = 1; c <= N; c++) {
    dp[r][c] = (dp[r - 1][c] + dp[r][c - 1]) % mod;
  }
}
console.log(dp[K][N] % mod);
