// https://www.acmicpc.net/problem/2609
/*
최대공약수와 최소공배수

두 개의 자연수를 입력받아 최대 공약수와 최소 공배수를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((i) => +i);
// console.log(input);

// // 문제 로직 - 방법 1 : 단순 순회로 최대공약수 찾기
// const [a, b] = input.sort((a, b) => a - b);
// // console.log(a, b);
// const factors = [];
// for (let i = 1; i <= a; i++) {
//   if (a % i === 0 && b % i === 0) factors.push(i);
// }
// const GCD = Math.max(...factors);
// const LCM = (a * b) / GCD;
// console.log(GCD);
// console.log(LCM);

// 문제 로직 - 방법 2 : 유클리드 호제법 (시간복잡도 logN)
const Euc = input.slice().sort((a, b) => b - a);
// console.log(Euc);
while (Euc[Euc.length - 2] % Euc[Euc.length - 1] !== 0) {
  const r = Euc[Euc.length - 2] % Euc[Euc.length - 1];
  Euc.push(r);
}
const GCD = Euc[Euc.length - 1];
const LCM = (input[0] * input[1]) / GCD;
console.log(GCD);
console.log(LCM);

/**
 // 최대공약수 GCD(Greatest Common Divisor) (factor 도 약수 맞음)
 // 최소공배수 LCM (Least Common Multiple) = a*b/최대공약수

 * 유클리드 호제법 (Euclidean Algorithm)
 https://blogshine.tistory.com/112

 2개의 자연수 a, b에 대해서 (a > b)
 a 를 b 로 나눈 나머지를 r 이라 하면
 a 와 b 의 최대공약수는 b 와 r 의 최대공약수와 같다. 

 이 성질에 따라 b 를 r 로 나눈 r' 를 구하고,
 다시 r 을 r' 로 나눈 나머지를 구하는 과정을 반복하여
 나머지가 0 이 되었을 때 나누는 수가 a 와 b 의 최대공약수이다.
  */
