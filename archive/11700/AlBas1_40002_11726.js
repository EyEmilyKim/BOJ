// https://www.acmicpc.net/problem/11726
/*
2×n 타일링

2×n 크기의 직사각형을 1×2, 2×1 타일로 채우는 방법의 수를 구하는 프로그램을 작성하시오.
아래 그림은 2×5 크기의 직사각형을 채운 한 가지 방법의 예이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = +require('fs').readFileSync(path).toString().trim().split(' ');
// console.log(input);

// 문제 로직
/**
 * n=1 ~ 4까지 그림 그려보면 피보나치 수열임을 알 수 있다.
 => 점화식 : dp[n] = dp[n-1] + dp[n-2]

 * 타일 붙일 때 좌우 구분하지 않는 이유 : 회전하지 말란 말이 없다...!

 * 그냥 더하다가 마지막에만 %10007 하면 숫자가 너무 커져 정상 계산 안됨.
 => 애초부터 %10007 결과값을 dp에 저장하여 해결 
 */
const dp = new Array(input + 1);
dp[1] = 1;
dp[2] = 2;
for (let i = 3; i <= input; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}
console.log(dp[input]);
