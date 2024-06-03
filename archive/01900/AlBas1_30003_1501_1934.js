// https://www.acmicpc.net/problem/1934
/*
최소공배수

두 자연수 A와 B에 대해서, A의 배수이면서 B의 배수인 자연수를 A와 B의 공배수라고 한다. 이런 공배수 중에서 가장 작은 수를 최소공배수라고 한다. 예를 들어, 6과 15의 공배수는 30, 60, 90등이 있으며, 최소 공배수는 30이다.

두 자연수 A와 B가 주어졌을 때, A와 B의 최소공배수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = input.shift();
// console.log(T, input);

// 문제 로직
const result = [];
input.forEach((i) => {
  const [A, B] = i.split(' ').map(Number);
  const smaller = Math.min(A, B);
  let GCD = -1;
  for (let i = smaller; i >= 1; i--) {
    if (A % i === 0 && B % i === 0) {
      GCD = i;
      break;
    }
  }
  const LCM = (A * B) / GCD;
  // console.log(A, B, 'GCD', GCD, 'LCM', LCM);
  result.push(LCM);
});
console.log(result.join('\n'));
