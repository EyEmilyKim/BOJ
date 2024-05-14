// https://www.acmicpc.net/problem/11653
/*
소인수분해

정수 N이 주어졌을 때, 소인수분해하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = Number(require('fs').readFileSync(path).toString().trim());
// console.log(input);

// 문제 로직

// 주어진 수의 소인수(=약수이면서 소수) 구하는 메서드
const getPF = (n) => {
  const pf = [];
  for (let i = 2; i <= n; i++) {
    let isFactor = 0;
    let isPrime = 1;
    if (n % i === 0) {
      // 약수이면서
      isFactor = 1;
      const factors = [];
      for (let j = 2; j <= i; j++) {
        // 소수인지 확인
        if (i % j === 0) factors.push(j);
        if (factors.length > 1) {
          isPrime = 0;
          break;
        }
      }
    }
    if (isFactor && isPrime) pf.push(i);
  }
  return pf;
};

// 소인수분해
const pf = getPF(input);
// console.log(pf);
const result = [];
let target = input;
pf.forEach((i) => {
  while (target % i === 0) {
    result.push(i);
    target /= i;
    // console.log(i, result, target);
  }
});
console.log(result.join('\n').trim());
