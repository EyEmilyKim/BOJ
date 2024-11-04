// https://www.acmicpc.net/problem/9251
/*
LCS

LCS(Longest Common Subsequence, 최장 공통 부분 수열)문제는 두 수열이 주어졌을 때, 모두의 부분 수열이 되는 수열 중 가장 긴 것을 찾는 문제이다.

예를 들어, ACAYKP와 CAPCAK의 LCS는 ACAK가 된다.


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [x, y] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);

// console.log(x, y);

// 문제 로직
/**
 * 2차원 DP
문자열 x, y 의 각 글자 비교하면서 부분 수열 길이 갱신해감.
글자가 다르면 => 이전 최대 길이 (dp[i-1][j], dp[i][j-1] 중 큰 것) 저장
글자가 같으면 => 이전 최대 길이 (dp[i-1][j-1]) + 1 저장
 * 참고) https://m.blog.naver.com/dlaxodud2388/222730438458
 */

const [lengX, lengY] = [x.length, y.length];
const dp = Array.from({ length: lengX + 1 }, () => new Array(lengY + 1).fill(0));

for (let i = 1; i <= lengX; i++) {
  for (let j = 1; j <= lengY; j++) {
    if (x[i - 1] === y[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
    else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
}

console.log(dp[lengX][lengY]);
