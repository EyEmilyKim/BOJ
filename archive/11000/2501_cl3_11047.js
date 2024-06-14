// https://www.acmicpc.net/problem/11047
/*
동전 0

준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다.

동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다. 이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, K] = input.shift().split(' ').map(Number);
const coins = input.map(Number);
// console.log(N, K, coins);

// 문제 로직
/**
 * 그리디 알고리즘
 * 가치가 큰 동전부터 환전해서 동전 개수 더하기
 */

let amount = K;
coins.sort((a, b) => b - a); // 동전 가치 내림차순
// console.log(coins);
let coinCnt = 0;
coins.forEach((i) => {
  const howMany = Math.floor(amount / i);
  amount %= i;
  if (howMany) coinCnt += howMany;
  // console.log(i, howMany, amount);
});
console.log(coinCnt);
