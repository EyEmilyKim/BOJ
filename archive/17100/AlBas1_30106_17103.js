// https://www.acmicpc.net/problem/17103
/**
골드바흐 파티션

골드바흐의 추측: 2보다 큰 짝수는 두 소수의 합으로 나타낼 수 있다.
짝수 N을 두 소수의 합으로 나타내는 표현을 골드바흐 파티션이라고 한다. 짝수 N이 주어졌을 때, 골드바흐 파티션의 개수를 구해보자. 두 소수의 순서만 다른 것은 같은 파티션이다.

입력>
첫째 줄에 테스트 케이스의 개수 T (1 ≤ T ≤ 100)가 주어진다. 각 테스트 케이스는 한 줄로 이루어져 있고, 정수 N은 짝수이고, 2 < N ≤ 1,000,000을 만족한다.

출력>
각각의 테스트 케이스마다 골드바흐 파티션의 수를 출력한다.
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const T = input.shift();
// console.log(T, input);

// 문제 로직
// input 최대값 이하의 소수 구하기 - 에라토스테네스의 체
const max = Math.max(...input);
const isPrime = Array(max + 1).fill(1); // max+1 : idx 와 정수 맞추기
isPrime[0] = isPrime[1] = 0;
for (let i = 2; i <= max; i++) {
  if (isPrime[i] === 0) continue;
  for (let j = i * 2; j <= max; j += i) {
    isPrime[j] = 0;
    // console.log(i, j);
  }
}
// console.log(max, isPrime);

// 골드바흐의 파티션 수 구하는 함수
function cntGoldbagh(n) {
  let cnt = 0;
  const mid = n / 2;
  for (let i = 2; i <= mid; i++) {
    if (isPrime[i] && isPrime[n - i]) cnt++;
  }
  return cnt;
}
// console.log(cntGoldbagh(20));

// 작업 수행
const result = [];
input.forEach((i) => {
  result.push(cntGoldbagh(i));
});
console.log(result.join('\n'));
