// https://www.acmicpc.net/problem/2133
/*
타일 채우기

3×N 크기의 벽을 2×1, 1×2 크기의 타일로 채우는 경우의 수를 구해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const n = +require('fs').readFileSync(path).toString().trim();
// console.log(n);

// 문제 로직
/**
 * dp
 * 가로가 홀수인 경우는 무조건 0
 * 길이가 2인 경우 기본 패턴 3가지. (ㅡㅡㅡ / ㅡㅣㅣ/ㅣㅣㅡ)
 * 길이가 4이상인 짝수의 경우... 기본패턴 조합 + 특수패턴 2가지 발생
+ 이전 칸에서 고려된 경우 *3 (기본패턴)
+ 이전 칸 제외한 각 칸들 경우 *2 (특수패턴)
+ 현재 칸에서 특수패턴 +2
 * (참고) https://yjg-lab.tistory.com/415
 */
const dp = new Array(n + 1).fill(0);
dp[2] = 3;

for (let i = 4; i <= n; i += 2) {
  dp[i] = dp[i - 2] * 3 + 2;

  for (let j = i - 4; j >= 0; j -= 2) {
    dp[i] += dp[j] * 2;
  }
}
console.log(dp[n]);
