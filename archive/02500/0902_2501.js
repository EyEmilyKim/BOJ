// https://www.acmicpc.net/problem/2501
/*
약수 구하기

두 개의 자연수 N과 K가 주어졌을 때, N의 약수들 중 K번째로 작은 수를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [A, B] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((val) => +val);
// console.log(A, B);

//문제 로직
const factors = [];
for (let i = 1; i <= A; i++) {
  if (A % i === 0) factors.push(i);
}
// console.log(factors);
if (factors.length < B) console.log(0);
else console.log(factors[B - 1]);
