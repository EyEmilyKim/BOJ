// https://www.acmicpc.net/problem/11050
/*
이항 계수 1

자연수 N 과 정수 K 가 주어졌을 때 이항 계수 
\(\binom{N}{K}\)를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, K] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((i) => +i);
// console.log(N, K);

// 문제 로직
/**
          n !
  nCk = ──────────
        k!(n-k)!
 */

const getFacto = (n) => {
  let facto = 1;
  for (let i = 2; i <= n; i++) {
    facto *= i;
  }
  return facto;
};

const top = getFacto(N);
const bot1 = getFacto(K);
const bot2 = getFacto(N - K);
const result = top / bot1 / bot2;
console.log(result);

/**
 * 이항계수란 주어진 집합에서 원하는 개수만큼 순서없이 뽑는 조합의 개수를 의미한다.
 * 여기서 이항 이란 한 개의 아이템에 대해서 뽑거나 뽑지않거나 두가지의 선택이 있기 때문에 붙은 단어이다.
 * 이항계수 공식 
          n !
  nCr = ──────────
        r!(n-r)!
 * (참고)
  https://shoark7.github.io/programming/algorithm/3-ways-to-get-binomial-coefficients        
 */
