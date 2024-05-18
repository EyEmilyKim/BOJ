// https://www.acmicpc.net/problem/9498
/*
시험 성적

시험 점수를 입력받아 90 ~ 100점은 A, 80 ~ 89점은 B, 70 ~ 79점은 C, 60 ~ 69점은 D, 나머지 점수는 F를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString();
const score = +input;

// 문제 로직
let grade = '';
if (90 <= score && score <= 100) grade = 'A';
else if (80 <= score && score <= 89) grade = 'B';
else if (70 <= score && score <= 79) grade = 'C';
else if (60 <= score && score <= 69) grade = 'D';
else grade = 'F';
console.log(grade);
