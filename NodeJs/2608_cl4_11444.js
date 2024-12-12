// https://www.acmicpc.net/problem/11444
/*
피보나치 수 6

피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const n = BigInt(require('fs').readFileSync(path).toString().trim());
// console.log(n);

// 문제 로직
/**
 * 피보나치 수열 점화식
n = 2k : 
  F(2k) = F(k)*( F(k+1) + F(k-1) )
n = 2k+1 : 
  F(2k+1) = F(k+1)^2 + F(k)^2

 * 행렬곱을 이용한 분할 정복 접근도 있지만.. 잘 이해를 못했다 [TBC]
 */

const mod = 1_000_000_007n;
const memo = new Map();

function fibo(n) {
  if (n === 0n) return 0n;
  if (n === 1n) return 1n;
  if (n === 2n) return 1n;
  if (memo[n] > 0n) return memo[n];

  const k = n / 2n;
  if (n % 2n === 0n) {
    memo[n] = (fibo(k) * (fibo(k + 1n) + fibo(k - 1n))) % mod;
  } else if (n % 2n === 1n) {
    memo[n] = (fibo(k + 1n) ** 2n + fibo(k) ** 2n) % mod;
  }
  return memo[n];
}

const result = fibo(n).toString();
console.log(result);
