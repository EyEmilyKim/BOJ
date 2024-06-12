// https://www.acmicpc.net/problem/1463
/*
1로 만들기

정수 X에 사용할 수 있는 연산은 다음과 같이 세 가지 이다.
- X가 3으로 나누어 떨어지면, 3으로 나눈다.
- X가 2로 나누어 떨어지면, 2로 나눈다.
- 1을 뺀다.
정수 N이 주어졌을 때, 위와 같은 연산 세 개를 적절히 사용해서 1을 만들려고 한다. 연산을 사용하는 횟수의 최솟값을 출력하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
/**
 * 문제 거꾸로 생각하기! 
 * 상향식 DP
 /2도 /3도 아니면 X에 -1 해서 X-1이 됨 
 => X 는 일단 X-1 연산횟수에 연산 한번 더하면 만들 수 있음 
  예: 10 에 -1 연산 진행해서 10 - 9 - 3 - 1 과정 거치는 경우,
      10의 최소 연산 횟수는 9의 최소 연산 횟수에 1을 더한 것과 같다.
 => /2, /3 이 가능할 때는 나눴을 때랑 -1 했을 때 뭐가 더 최소인지 비교하며 DP 쌓아나감

 * 1은 처음부터 1이니까 필요 연산 0회. 2부터 DP값 구하기.
 */
const num = Number(input);
const dp = new Array(num + 1).fill(0); // 배열[X] : 정수X의 최소 연산 횟수
for (let i = 2; i <= num; i++) {
  dp[i] = dp[i - 1] + 1;
  if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  // console.log(i, dp);
}
console.log(dp[num]);
