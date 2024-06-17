// https://www.acmicpc.net/problem/11727
/*
2×n 타일링 2

2×n 직사각형을 1×2, 2×1과 2×2 타일로 채우는 방법의 수를 구하는 프로그램을 작성하시오.

아래 그림은 2×17 직사각형을 채운 한가지 예이다.
...

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = +require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
/**
 * DP => 점화식 : dp[x] = dp[x-1] + 2*dp[x-2]
 * 11726_2×n 타일링 문제 참고
 */
const memo = new Array(input + 1).fill(0);
memo[1] = 1;
memo[2] = 3;
for (let i = 3; i <= input; i++) {
  memo[i] = (memo[i - 1] + 2 * memo[i - 2]) % 10007;
}
// console.log(memo);

console.log(memo[input]);
