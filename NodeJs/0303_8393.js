// https://www.acmicpc.net/problem/8393
/*
n이 주어졌을 때, 1부터 n까지 합을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const num = Number(require('fs').readFileSync('example.txt').toString());
// console.log(num);

// 문제 로직
let sum = 0;
for (i = 1; i <= num; i++) {
  sum += i;
}
console.log(sum);
