// https://www.acmicpc.net/problem/4134
/*
다음 소수

정수 n(0 ≤ n ≤ 4*109)가 주어졌을 때, n보다 크거나 같은 소수 중 가장 작은 소수 찾는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, ...test] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
// console.log(N, test);

// 문제 로직

// 소수 판별 함수
function isPrime(num) {
  if (num < 2) return false;
  const root = Math.sqrt(num);
  for (let i = 2; i <= root; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// 작업 수행
const result = [];
for (let tNum of test) {
  while (!isPrime(tNum)) {
    tNum++;
  }
  result.push(tNum);
}
console.log(result.join('\n'));
