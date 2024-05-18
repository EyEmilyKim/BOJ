// https://www.acmicpc.net/problem/18108
/*
1998년생인 내가 태국에서는 2541년생?!

불기 연도가 주어질 때 이를 서기 연도로 바꿔 주는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString();
const y = parseInt(input);
// console.log(y);

// 문제 로직
const ad = y - 543;
console.log(ad);
