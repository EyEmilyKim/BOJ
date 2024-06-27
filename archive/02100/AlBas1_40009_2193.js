// https://www.acmicpc.net/problem/2193
/*
이친수

0과 1로만 이루어진 수를 이진수라 한다. 이러한 이진수 중 특별한 성질을 갖는 것들이 있는데, 이들을 이친수(pinary number)라 한다. 이친수는 다음의 성질을 만족한다.

이친수는 0으로 시작하지 않는다.
이친수에서는 1이 두 번 연속으로 나타나지 않는다. 즉, 11을 부분 문자열로 갖지 않는다.
예를 들면 1, 10, 100, 101, 1000, 1001 등이 이친수가 된다. 하지만 0010101이나 101101은 각각 1, 2번 규칙에 위배되므로 이친수가 아니다.

N(1 ≤ N ≤ 90)이 주어졌을 때, N자리 이친수의 개수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = +require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
/**
 * DP
 * 점화식 : 피보나치 !
  1자리 => (1) 1
  2자리 => (1) 10
  3자리 => (2) 100, 101
  4자리 => (3) 1000, 1001, 1010
  5자리 => (5) 10000, 10001, 10010, 10100, 10101
 * N(1 ≤ N ≤ 90)=> BigInt !
*/

// N자리 이친수 구하는 DP // N(1 ≤ N ≤ 90)=> BigInt !
const dp = new Array(input + 1).fill(0n);
dp[1] = 1n;
for (let n = 2; n <= input; n++) {
  dp[n] = dp[n - 1] + dp[n - 2];
}
// console.log(dp);

// 타겟값 출력
console.log(String(dp[input]));
