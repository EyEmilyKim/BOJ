// https://www.acmicpc.net/problem/2753
/*
윤년

연도가 주어졌을 때, 윤년이면 1, 아니면 0을 출력하는 프로그램을 작성하시오.
윤년은 연도가 4의 배수이면서, 100의 배수가 아닐 때 또는 400의 배수일 때이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString();
const y = +input;

// 문제 로직
let leapY = 0;
if (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)) leapY = 1;
console.log(leapY);
