// https://www.acmicpc.net/problem/6571
/*
피보나치 수의 개수

피보나치 수의 정의는 다음과 같다.

f1 := 1
f2 := 2
fn := fn-1 + fn-2 (n ≥ 3)
두 수 a와 b가 주어졌을 때, 구간 [a, b]에 포함되는 피보나치 수의 개수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
input.pop();
const test = input.map((i) => i.split(' ').map(BigInt));
// console.log(test);

// 문제 로직

// 피보나치 수열 구하기
let max = 0n;
for (let t of test) {
  if (t[1] > max) max = t[1];
}
// console.log(max);
const dp = [];
// dp[0] = 0n;
dp[1] = 1n;
dp[2] = 2n;
for (let i = 3; dp[dp.length - 1] < max; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}
// console.log(dp);

// 테스트 수행
const result = [];
const dpLeng = dp.length;
for (let t of test) {
  let cnt = 0;
  const [a, b] = t;
  for (let i = 0; i <= dpLeng; i++) {
    if (a <= dp[i] && dp[i] <= b) cnt++;
  }
  // if (a === 0) cnt -= 1;
  result.push(cnt);
}
console.log(result.join('\n'));
