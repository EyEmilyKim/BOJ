// https://www.acmicpc.net/problem/25304
/*
영수증에 적힌,
구매한 각 물건의 가격과 개수
구매한 물건들의 총 금액
을 보고, 구매한 물건의 가격과 개수로 계산한 총 금액이 영수증에 적힌 총 금액과 일치하는지 검사해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split(/\r?\n/);
// console.log(input);

// 문제 로직
const total = input[0];
const num = input[1];
let sum = 0;
for (i = 0; i < num; i++) {
  const [p, c] = input[i + 2].split(' ').map((val) => +val);
  sum = sum + p * c;
}
total == sum ? console.log('Yes') : console.log('No');
