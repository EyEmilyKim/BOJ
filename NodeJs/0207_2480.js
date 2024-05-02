// https://www.acmicpc.net/problem/2480
/*
1에서부터 6까지의 눈을 가진 3개의 주사위를 던져서 다음과 같은 규칙에 따라 상금을 받는 게임이 있다.
3개 주사위의 나온 눈이 주어질 때, 상금을 계산하는 프로그램을 작성 하시오.

같은 눈이 3개가 나오면 10,000원+(같은 눈)×1,000원의 상금을 받게 된다.
같은 눈이 2개만 나오는 경우에는 1,000원+(같은 눈)×100원의 상금을 받게 된다.
모두 다른 눈이 나오는 경우에는 (그 중 가장 큰 눈)×100원의 상금을 받게 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const [A, B, C] = require('fs')
  .readFileSync('example.txt')
  .toString()
  .split(' ')
  .map((val) => +val);
// console.log(A, B, C);

// 문제 로직
let rwd = 0;
if (A == B && B == C && C == A) {
  // 3개 모두 같은 경우
  rwd = 10000 + A * 1000;
} else if (A != B && B != C && C != A) {
  // 3개 모두 다른 경우
  rwd = Math.max(A, B, C) * 100;
} else {
  // 나머지.. 2개는 같고 1개 다른 경우
  if (A == B || A == C) rwd = 1000 + A * 100;
  else rwd = 1000 + B * 100;
}
console.log(rwd);
