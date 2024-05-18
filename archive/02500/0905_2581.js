// https://www.acmicpc.net/problem/2581
/*
소수

자연수 M과 N이 주어질 때 M이상 N이하의 자연수 중 소수인 것을 모두 골라 이들 소수의 합과 최솟값을 찾는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [M, n] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((val) => +val);
// console.log(M, N);

//문제 로직

// 주어진 수가 소수인지 확인하는 메서드
const isPrime = (n) => {
  if (n === 1) return 0; // 1은 제외
  let isPrime = 1;
  const factors = [];
  for (let i = 0; i <= n; i++) {
    if (n % i === 0) factors.push(i);
    if (factors.length > 2) {
      isPrime = 0;
      break;
    }
  }
  return isPrime;
};

// 소수 찾기
const primes = [];
for (let i = M; i <= n; i++) {
  if (isPrime(i)) primes.push(i);
}
// console.log(primes);

// 출력하기
if (!primes.length) console.log(-1);
else {
  const sum = primes.reduce((A, B) => A + B);
  const min = primes[0];
  console.log(sum);
  console.log(min);
}
